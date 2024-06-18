import { BaseDO } from "./base.do";
import { ContactDO } from "./contact.do";
import { DocumentDO } from "./document.do";
import { LandDO } from "./land.do";

/**
 * CRM Contact opportunity
 */
export class OpportunityDO extends BaseDO {
    name: string;
    land: LandDO;
    contact: ContactDO;
    amount: number;
    status: string;
    description: string;
    documents: DocumentDO[];

    constructor() {
        super();

        this.documents = [];
    }
}