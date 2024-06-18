import { Schema } from "mongoose";
import { OpportunityDO } from "@/data/domain_object/crm/opportunity.do";
import { CRMRepository } from "./crm.repository";
import { opportunityMapping } from "@/data/mappings/crm/opportunity";
import { Mapping } from "@/data/mappings/crm/base";

/**
 * Opportunity repository
 * 
 * @see CRMRepository
 */
export class OpportunityRepository extends CRMRepository<OpportunityDO, Mapping<Schema<OpportunityDO>>> {
    /**
     * 
     * @param filters 
     * @param sorting 
     * @param limit 
     * @param offset 
     * @param includeDeleted 
     * @param relations 
     * @returns 
     */
    async find(filters?: string | any[] | { [fieldName: string]: any; }, sorting?: string | any[] | { [fieldName: string]: any; }, limit?: number, offset?: number, includeDeleted?: boolean, relations?: string[]) {
        return super.find(filters, sorting, limit, offset, includeDeleted, ['land', 'contact']);
    }
    
    /**
     * 
     * @param filters 
     * @param sorting 
     * @param limit 
     * @param offset 
     * @param includeDeleted 
     * @param relations 
     * @returns 
     */
    async findAndCount(filters?: string | any[] | { [fieldName: string]: any; }, sorting?: string | any[] | { [fieldName: string]: any; }, limit?: number, offset?: number, includeDeleted?: boolean, relations?: string[]) {
        return super.findAndCount(filters, sorting, limit, offset, includeDeleted, ['land', 'contact']);
    };
}

/**
 * 
 */
export const opportunityRepository = new OpportunityRepository(opportunityMapping);
