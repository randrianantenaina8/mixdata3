import { Schema } from 'mongoose';
import { NoteDO } from "@/data/domain_object/crm/note.do";
import { Mapping, baseMapping } from "./base";

const getMapping = () => {
    return {
        ...baseMapping,
        description: String,
    }
}

export const noteMapping = new Mapping("note", new Schema<NoteDO>(getMapping(), { timestamps: true }));
