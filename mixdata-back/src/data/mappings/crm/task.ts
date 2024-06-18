import { Schema } from 'mongoose';
import { TaskDO } from "@/data/domain_object/crm/task.do";
import { Mapping, baseMapping } from "./base";

const getMapping = () => {
    return {
        ...baseMapping,
        name: String,
        description: String,
        status: String,
    }
}

export const taskMapping = new Mapping("task", new Schema<TaskDO>(getMapping(), { timestamps: true }));
