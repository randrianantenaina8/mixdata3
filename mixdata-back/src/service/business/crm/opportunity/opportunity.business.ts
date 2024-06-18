import { logger } from "@/common/logger";
import { landRepository } from "@/repository/crm/land.repository";
import { contactRepository } from "@/repository/crm/contact.repository";
import { opportunityRepository } from "@/repository/crm/opportunity.repository";
import { OpportunityRequestDTO, DocumentDTO } from "@/data/dto/crm/opportunity/opportunity-request.dto"
import { DocumentDO } from "@/data/domain_object/crm/document.do";
import { TaskDO } from "@/data/domain_object/crm/task.do";
import { OpportunityDO } from "@/data/domain_object/crm/opportunity.do";

export class OpportunityBusiness {
    private tenantId = undefined;

    /**
     * Build a service with tenant restriction
     * 
     * @param tenantId 
     */
    constructor(tenantId = undefined) {
        this.tenantId = tenantId;
    }

    /**
     * Create a secured instance
    */
    secured: (tenantId: string | number) => OpportunityBusiness = (tenantId: string | number) => {
        return new OpportunityBusiness(tenantId);
    }

    /**
     * Search records
     * @param filters 
     * @param sorting 
     * @param limit 
     * @param offset 
     * @returns 
     */
    search = async (
        filters: { [fieldName: string]: any } | any[] | string = {},
        sorting: { [fieldName: string]: any } | any[] | string = {} = {},
        limit: number = -1,
        offset: number = -1,
        includeDeleted: boolean = false
    ) => {
        try {
            // Apply security
            const securedFilters = this.tenantId ? {
                "$and": [
                    { tenantId: this.tenantId },
                    filters,
                ]
            } : filters;
            return await opportunityRepository.findAndCount(securedFilters, sorting, limit, offset, includeDeleted);
        } catch (err) {
            logger.debug(`Search error: ${err.message}`);
        }

        return {
            records: [],
            count: 0,
            totalCount: 0,
            hasMore: false,
        };
    }

    /**
     * Create an opportunity
     * 
     * @param data 
     * @returns 
     */
    create = async (data : OpportunityRequestDTO) => {
        const opportunity : OpportunityDO = new OpportunityDO();
        
        // Persist contact        
        const createResult = await this.persist(opportunity, data);
        
        if (createResult) {
            return createResult;
        }

        throw new Error("Create opportunity error.");
    }

    /**
     * Update an opportunity
     * 
     * @param data 
     */
    update = async (opportunity: OpportunityDO, data : OpportunityRequestDTO) => {
        // Persist opportunity
        const updateResult = await this.persist(opportunity, data);

        if (updateResult) {
            return updateResult;
        }

        throw new Error("Update opportunity error.")
    }

    /**
     * Delete an Opportunity
     * @param opportunity 
     */
    delete = async (opportunity: OpportunityDO) => {
        const deleteResult = await opportunityRepository.delete(opportunity);

        if (deleteResult) {
            return deleteResult;
        }

        throw new Error("Delete opportunity error.")
    }

    /**
     * Persist opportunity information
     * Copy 
     * 
     * @param opportunity 
     * @param data 
     * @returns 
     */
    protected persist = async (opportunity: OpportunityDO, data: OpportunityRequestDTO) => {
        // Set additional props
        [
            "name",
            "amount",
            "status",
            "description",
        ].forEach((field) => {
            if (data[field] === undefined) {
                return;
            }

            opportunity[field] = data[field];
        })

        // Security
        opportunity.tenantId = this.tenantId;
        opportunity.createdBy = opportunity.createdBy || this.tenantId;
        opportunity.updatedBy = this.tenantId;
        opportunity.land = data.land_id as any;

        // Apply documents if exists
        if (data.documents) {
            await this.mergeOpportunityDocuments(data.documents, opportunity);
        }
        
        // Apply contact
        if (data.contact_id) {
            await this.updateOpportunityContact(data.contact_id, opportunity);
        }

        // Apply land
        if (data.land_id) {
            await this.updateOpportunityLand(data.land_id, opportunity);
        }

        return await opportunityRepository.save(opportunity);
    }

    /**
     * 
     * @param contact_id 
     * @param opportunity 
     */
    protected updateOpportunityContact = async (contact_id: string , opportunity: OpportunityDO) => {
        // Validate ids to attach
        const filters = { _id : contact_id };
        // Secure
        const securedFilters = this.tenantId ? {
            "$and": [
                { tenantId: this.tenantId },
                filters,
            ]
        } : filters;

        const validatedContact = await contactRepository.find(securedFilters);
        if (validatedContact.count > 0) {
            opportunity.contact = validatedContact.records[0];
        }
    }

    /**
     * 
     * @param land_id 
     * @param opportunity 
     */
    protected updateOpportunityLand = async (land_id: string, opportunity: OpportunityDO) => {
        // Validate ids to attach
        const filters = { _id : land_id };
        // Secure
        const securedFilters = this.tenantId ? {
            "$and": [
                { tenantId: this.tenantId },
                filters,
            ]
        } : filters;

        const validatedLand = await landRepository.find(securedFilters);
        if (validatedLand.count > 0) {
            opportunity.land = validatedLand.records[0];
        }
    }

    /**
     * Copy documents info
     * 
     * @param from 
     * @param to 
     */
    protected mergeOpportunityDocuments = async (fromDocuments: DocumentDTO[], toOpportunity: OpportunityDO) => {
        // Current documents
        const currentLinkedDocuments = toOpportunity.documents || [];
        const currentLinkedDocumentsMap = new Map(currentLinkedDocuments.map((n) => [n._id.toString(), n]));
        
        logger.debug('Current linked ids: ', [...currentLinkedDocumentsMap.keys()]);

        const seednIds = new Set();
        const fromDocumentsUnique = fromDocuments.filter((d) => {
            if (seednIds.has(d._id)) {
                return false;
            }

            if (d._id) {
                seednIds.add(d._id);
            }

            return true;
        })

        // Update opportunity information
        toOpportunity.documents = [...fromDocumentsUnique]
            .map((d) => {
                const existingDocument = currentLinkedDocumentsMap.get(d._id);

                // TODO: handle file upload
                const ext = d.ext || existingDocument?.ext;
                const mime = d.mime || existingDocument?.mime;
                const path = d.path || existingDocument?.path;
                const size = d.size || existingDocument?.size;

                const newDocument = {
                    ...existingDocument,                   // Copy current data
                    tenantId: this.tenantId,           // Secure
                    createdAt: existingDocument?.createdAt || new Date(),    // Copy creation info
                    createdBy: existingDocument?.createdBy || this.tenantId, // Copy creation info
                    updatedAt: new Date(),
                    updatedBy: this.tenantId,
                    // Set properties
                    name: d.name || existingDocument?.name,
                    description: d.description || existingDocument?.description,       // Update description
                    ext,
                    mime,
                    path,
                    size,
                } as DocumentDO

                return newDocument;
            });
    }
}

export const opportunityBusiness = new OpportunityBusiness();