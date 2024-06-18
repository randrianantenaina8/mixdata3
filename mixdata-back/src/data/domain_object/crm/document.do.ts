import { BaseDO } from "./base.do";

/**
 * Document DO
 */
export class DocumentDO extends BaseDO {
    name: string;
    description: string;
    path: string;
    mime: string;
    ext: string;
    size: number;
}