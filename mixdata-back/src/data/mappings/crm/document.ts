import { Schema } from 'mongoose';
import { DocumentDO } from "@/data/domain_object/crm/document.do";
import { Mapping, baseMapping } from "./base";

const getMapping = () => {
    return {
        ...baseMapping,
        name: String,
        description: String,
        path: String,
        mime: String,
        ext: String,
        size: String,
    }
}

export const documentMapping = new Mapping("document", new Schema<DocumentDO>(getMapping(), { timestamps: true }));
