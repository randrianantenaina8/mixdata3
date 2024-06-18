import { logger } from "@/common/logger";
import { contactRepository } from "@/repository/crm/contact.repository";
import { ContactRequestDTO, ContactLandDTO, NoteDTO, OpportunityDTO } from "@/data/dto/crm/contact/contact-request.dto"
import { landRepository } from "@/repository/crm/land.repository";
import { ContactDO } from "@/data/domain_object/crm/contact.do";
import { LandDO, OwnedLandDO } from "@/data/domain_object/crm/land.do";
import { NoteDO } from "@/data/domain_object/crm/note.do";
import { OpportunityDO } from "@/data/domain_object/crm/opportunity.do";

export class ContactBusiness {
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
    secured: (tenantId: string | number) => ContactBusiness = (tenantId: string | number) => {
        return new ContactBusiness(tenantId);
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
            return await contactRepository.findAndCount(securedFilters, sorting, limit, offset, includeDeleted);
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
     * Create a contact
     * 
     * @param data 
     * @returns 
     */
    create = async (data : ContactRequestDTO) => {
        const contact : ContactDO = new ContactDO();
        
        // Persist contact        
        const createResult = await this.persist(contact, data);
        
        if (createResult) {
            return createResult;
        }

        throw new Error("Create contact error.");
    }

    /**
     * Update a contact
     * 
     * @param data 
     */
    update = async (contact: ContactDO, data : ContactRequestDTO) => {
        // Persist contact
        const updateResult = await this.persist(contact, data);

        if (updateResult) {
            return updateResult;
        }

        throw new Error("Update contact error.")
    }

    /**
     * Delete a contact
     * @param contact 
     */
    delete = async (contact: ContactDO) => {
        const deleteResult = await contactRepository.delete(contact);

        if (deleteResult) {
            return deleteResult;
        }

        throw new Error("Delete contact error.")
    }

    /**
     * Persist contact information
     * Copy 
     * 
     * @param contact 
     * @param data 
     * @returns 
     */
    protected persist = async (contact: ContactDO, data: ContactRequestDTO) => {
        // Set additional props
        [
            "firstName",
            "lastName",
            "address",
            "emails",
            "website",
            "facebook",
            "linkedin",
            "twitter",
            "whatsapp",
            "phones"
        ].forEach((field) => {
            if (data[field] === undefined) {
                return;
            }

            contact[field] = data[field];
        })

        // Security
        contact.tenantId = this.tenantId;
        contact.createdBy = contact.createdBy || this.tenantId;
        contact.updatedBy = this.tenantId;

        // Apply lands if exists
        if (data.lands) {
            await this.mergeContactLands(data.lands, contact);
        }

        // Merge notes
        if (data.notes) {
            await this.mergeContactNotes(data.notes, contact);
        }
        
        return await contactRepository.save(contact);
    }

    /**
     * Copy land info
     * 
     * @param from 
     * @param to 
     */
    protected mergeContactLands = async (fromLands: ContactLandDTO[], toContact: ContactDO) => {
        // Current lands
        const currentLinkedLands = toContact.lands || [];
        const currentLinkedLandsMap = new Map(currentLinkedLands.map((l) => [l._id.toString(), l]));
        logger.debug('Current linked ids: ', [...currentLinkedLandsMap.keys()]);

        // New lands (dedup)
        const fromLandsMap: Map<string, ContactLandDTO> = new Map(fromLands.map((l) => [l._id.toString(), l]));

        // Validate ids to attach
        const filters = { _id : [...fromLandsMap.keys()] };
        // Secure
        const securedFilters = this.tenantId ? {
            "$and": [
                { tenantId: this.tenantId },
                filters,
            ]
        } : filters;
        const validatedLandsToAttach = await landRepository.findAndCount(securedFilters);
        const validatedLandsMap = new Map(validatedLandsToAttach.records.map((l) => [l._id.toString(), l]))

        logger.debug('Found: ', [...validatedLandsMap.keys()]);

        // Update contacts information
        toContact.lands = [...fromLandsMap.values()]
            .filter((l) => validatedLandsMap.has(l._id))
            .map((l) => {
                const validatedLand = validatedLandsMap.get(l._id);
                const currentLinkedLand = currentLinkedLandsMap.get(l._id);

                const newLand = {
                    ...validatedLand,                   // Copy current data
                    type: l.type || currentLinkedLand?.type,                                          // Copy type
                    tenantId: this.tenantId,                               // Secure
                    createdAt: currentLinkedLand?.createdAt || new Date(), // Copy creation info
                    createdBy: currentLinkedLand?.createdBy || this.tenantId, // Copy creation info
                    updatedAt: new Date(),
                    updatedBy: this.tenantId,
                } as OwnedLandDO

                return newLand;
            });
    }

    /**
     * Copy notes info
     * 
     * @param from 
     * @param to 
     */
    protected mergeContactNotes = async (fromNotes: NoteDTO[], toContact: ContactDO) => {
        // Current notes
        const currentLinkedNotes = toContact.notes || [];
        const currentLinkedNotesMap = new Map(currentLinkedNotes.map((n) => [n._id.toString(), n]));
        
        logger.debug('Current linked ids: ', [...currentLinkedNotesMap.keys()]);

        const seednIds = new Set();
        const fromNotesUnique = fromNotes.filter((n) => {
            if (seednIds.has(n._id)) {
                return false;
            }

            if (n._id) {
                seednIds.add(n._id);
            }

            return true;
        })

        // Update contacts information
        toContact.notes = [...fromNotesUnique]
            .map((n) => {
                const existingNote = currentLinkedNotesMap.get(n._id);
                const newNote = {
                    ...existingNote,                   // Copy current data
                    tenantId: this.tenantId,           // Secure
                    createdAt: existingNote?.createdAt || new Date(),    // Copy creation info
                    createdBy: existingNote?.createdBy || this.tenantId, // Copy creation info
                    updatedAt: new Date(),
                    updatedBy: this.tenantId,
                    // Set properties
                    description: n.description || existingNote?.description,       // Update description
                } as NoteDO

                return newNote;
            });
    }
}

export const contactBusiness = new ContactBusiness();