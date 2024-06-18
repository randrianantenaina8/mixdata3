import { Schema } from 'mongoose';
import { OpportunityDO } from "@/data/domain_object/crm/opportunity.do";
import { Mapping, baseMapping } from "./base";
import { landMapping } from "./land";
import { documentMapping } from "./document";
import { contactMapping } from './contact';

const getMapping = () => {
    return {
        ...baseMapping,
        name: String,
        amount: Number,
        status: String,
        description: String,
        land: {
            type: Schema.Types.ObjectId,
            ref: landMapping.name,
        },
        contact: {
            type: Schema.Types.ObjectId,
            ref: contactMapping.name,
        },
        documents: [documentMapping.schema]
    };
}

export const opportunityMapping = new Mapping("opportunity", new Schema<OpportunityDO>(getMapping(), { timestamps: true }));
