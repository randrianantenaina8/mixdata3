import { logger } from "@/common/logger";
import { contactRepository } from "@/repository/crm/contact.repository";
import { ContactRequestDTO, ContactLandDTO } from "@/data/dto/crm/contact/contact-request.dto"
import { landRepository } from "@/repository/land.repository";
import { landRepository as CRMLandRepository } from "@/repository/crm/land.repository";
import { ContactDO } from "@/data/domain_object/crm/contact.do";
import { LandDO, OwnedLandDO } from "@/data/domain_object/crm/land.do";
import { LandManagementRequestDTO } from "@/data/dto/crm/land/landManagement-request.dto";

type MixDataLand = {
    id: number,
    land_id: number,
    owners: {
        id: number,
        name: string,
        type: string
    }[]
}

export class LandBusiness {
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
    secured: (tenantId: string | number) => LandBusiness = (tenantId: string | number) => {
        return new LandBusiness(tenantId);
    }

    /**
     * Get land from mixdata
     * 
     * @param landId 
     * @returns 
     */
    private findLandFromMixData: (landId: string) => Promise<MixDataLand | undefined> = async (landId: string) => {
        const mixdataLands = await landRepository.findOne('lands', { land_id: landId });

        // No land
        if (mixdataLands.total <= 0) {
            throw new Error("Invalid land.");
        }

        const record = mixdataLands.results > 1 ? mixdataLands.results[0] : mixdataLands.results;
        
        return record._source;
    }

    /**
     * Create CRM land from mixData
     * 
     * @param land 
     * @param tenantId 
     * @returns 
     */
    private findOrCreateCRMLand : (land: MixDataLand, tenantId: any) => Promise<LandDO> = async (land: MixDataLand, tenantId: any) => {
        // Apply security
        const filters = { externalId: land.land_id.toString() };
        const securedFilters = this.tenantId ? {
            $and: [
                { tenantId: this.tenantId },
                filters,
            ]
        } : filters;

        // Find existing land inside CRM
        const crmLands = await CRMLandRepository.find(securedFilters);

        // Land exists
        if (crmLands.count > 0) {
            return crmLands.records[0];
        }

        // Create a new land bound to tenant
        const newLand = new LandDO();
        newLand.code = land.land_id.toString();
        newLand.externalId = land.land_id.toString();
        newLand.tenantId = this.tenantId ? this.tenantId : tenantId;
        newLand.createdBy = newLand.createdBy = this.tenantId;
        newLand.updatedBy = newLand.createdBy = this.tenantId;

        const landRecord = await CRMLandRepository.save(newLand);

        return landRecord as LandDO;
    }

    manage = async (data: LandManagementRequestDTO) => {
        const { landId, tenantId } = data;

        if (!landId) {
            throw new Error("Land cannot be managed");
        }

        // Lands from mixdata
        const mixdataRecord = await this.findLandFromMixData(landId);
        // 
        const crmLandRecord = await this.findOrCreateCRMLand(mixdataRecord, tenantId);

        // lands created, create contacts
        const owners = mixdataRecord?.owners || [];

        //
        const ownerIds = owners.map((owner) => ({ externalId: owner.id.toString() }));

        // Find contacts from the crm
        const filters = { $or: ownerIds };
        const securedFilters = this.tenantId ? {
            $and: [
                { tenantId: this.tenantId },
                filters,
            ]
        } : filters;

        const crmContacts = await contactRepository.find(securedFilters);
        const crmContactRecordsMap: Map<string, ContactDO> = new Map(
            crmContacts.records.map((contact) => [contact.externalId, contact])
        );

        // Merge contacts
        const contactsToUpdate = [];
        const contactsToUpdateIds = [];
        owners.forEach((owner) => {
            const externalId = owner.id.toString();
            const crmContact = crmContactRecordsMap.has(externalId)
                ? crmContactRecordsMap.get(externalId)
                : new ContactDO();

            // New contact
            if (!crmContact._id) {
                crmContact.firstName = owner.name;
                crmContact.lastName = "";
                crmContact.externalId = owner.id.toString();
                crmContact.tenantId = this.tenantId;
                crmContact.createdBy = this.tenantId;
                crmContact.updatedBy = this.tenantId;
            } else {
                contactsToUpdateIds.push(crmContact._id);
            }

            // Find land
            const landExists = crmContact.lands.findIndex((land) => land._id.toString() === crmLandRecord._id.toString()) > -1;
            if (landExists) {
                return;
            }

            // Attach land
            const updateDate = new Date();
            crmContact.lands.push({
                ...crmLandRecord,
                createdAt: updateDate,
                updatedAt: updateDate,
                createdBy: this.tenantId,
                updatedBy: this.tenantId,
                tenantId: this.tenantId,
                myField: "KKKKKKK",
                type: "owner",
            } as OwnedLandDO);

            // Save land
            contactsToUpdate.push(contactRepository.save(crmContact));
        })

        const updatedContactsResult = await Promise.all(contactsToUpdate);
        updatedContactsResult.forEach((contact) => {
            if (contact.id) {
                contactsToUpdateIds.push(contact.id);
            }
        })

        const updatedContacts = await contactRepository.findAndCount({ _id: { $in: contactsToUpdateIds } });

        return {
            lands: crmLandRecord,
            contacts: updatedContacts.records,
        };
    }
}

export const landBusiness = new LandBusiness();