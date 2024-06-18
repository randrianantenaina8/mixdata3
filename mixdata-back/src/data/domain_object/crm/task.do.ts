import { BaseDO } from "./base.do";

/**
 * Contact Task
 */
export class TaskDO extends BaseDO {
    name: string;
    description: string;
    status: string;
}