export class DocumentDTO {
    _id?: any;
    //
    name?: string;
    description?: string;
    path?: string;
    mime?: string;
    ext?: string;
    size?: number;
}

export class OpportunityRequestDTO {
    _id?: any;
    name?: string;
    land_id: string;
    contact_id: string;
    amount?: number;
    status?: string;
    description?: string;
    documents?: DocumentDTO[];
}
