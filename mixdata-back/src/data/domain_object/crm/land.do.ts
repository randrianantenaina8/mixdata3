import { BaseDO } from "./base.do";
import { ContactDO } from "./contact.do";

/**
 * CRM Plot of Land
 */
export class LandDO extends BaseDO {
    code: string;
    externalId: string;
}

/**
 * 
 */
export class OwnedLandDO extends LandDO {
    type: string; //
}