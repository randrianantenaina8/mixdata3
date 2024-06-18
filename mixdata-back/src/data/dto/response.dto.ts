import { integer } from "@elastic/elasticsearch/lib/api/types";

export class ResponseDTO {

    error: boolean;
    details: any;

    constructor({ details, error}) {
        this.error = error;
        this.details = details;
    }
}