export class ContactPhoneDTO {
    _id?: any;
    number?: string;
    type?: string; // work, mobile
}

export class ContactLandDTO {
    _id?: any;
    //
    code?: string;
    externalId?: string;
    type?: string; // 
}

export class NoteDTO {
    _id?: any;
    //
    description?: string;
}

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

export class OpportunityDTO {
    _id?: any;
    name?: string;
    land_id: string;
    contact_id: string;
    amount?: number;
    status?: string;
    description?: string;
    documents?: DocumentDTO[];
}

export class ContactRequestDTO {
    _id?: any;
    // 
    firstName?: string;
    lastName?: string;
    address?: string;
    emails?: string[];
    website?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    whatsapp?: string;
    // 
    phones?: ContactPhoneDTO[]; // numero fixe, mobile
    //
    lands?: ContactLandDTO[];
    notes?: NoteDTO[];
    opportunities?: OpportunityDTO[];
}