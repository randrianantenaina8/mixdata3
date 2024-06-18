import { Schema } from 'mongoose';
import { ContactDO, ContactPhoneVO } from "@/data/domain_object/crm/contact.do";
import { baseMapping, Mapping } from "./base";
import { ownedLandMapping } from "./land";
import { noteMapping } from "./note";

const getContactPhoneMapping = () => {
    return new Schema<ContactPhoneVO>({
        number: String,
        type: String,
    });
}

const getMapping = () => {
    return {
        ...baseMapping,
        firstName: String,
        lastName: String,
        address: String,
        emails: [String],
        website: String,
        facebook: String,
        linkedin: String,
        twitter: String,
        whatsapp: String,
        externalId: String,
        // 
        phones: [getContactPhoneMapping()],
        lands: [ownedLandMapping.schema],
        notes: [noteMapping.schema],
    }
}

export const contactMapping = new Mapping("contact", new Schema<ContactDO>(getMapping(), { timestamps: true }));
