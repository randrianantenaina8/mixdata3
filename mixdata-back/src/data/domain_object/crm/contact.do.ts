import { BaseDO } from "./base.do";
import { OwnedLandDO } from "./land.do";
import { NoteDO } from "./note.do";
import { OpportunityDO } from "./opportunity.do";

/**
 * Contact phone
 */
export class ContactPhoneVO {
    number: string;
    type: string; // work, mobile
}

/**
 * CRM Contact
 */
export class ContactDO extends BaseDO {
    firstName: string;
    lastName: string;
    address: string;
    emails: string[];
    website: string;
    facebook: string;
    linkedin: string;
    twitter: string;
    whatsapp: string;
    //
    phones: ContactPhoneVO[]; // numero fixe, mobile
    //
    lands: OwnedLandDO[];
    notes: NoteDO[];
    opportunities: OpportunityDO[];
    
    //
    externalId: string;

    constructor() {
        super();

        this.emails = [];
        this.phones = [];
        this.lands = [];
        this.notes = [];
        this.opportunities = [];
    }
}
