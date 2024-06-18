import { Schema } from "mongoose";
import { ContactDO } from "@/data/domain_object/crm/contact.do";
import { CRMRepository } from "./crm.repository";
import { contactMapping } from "@/data/mappings/crm/contact";
import { Mapping } from "@/data/mappings/crm/base";

/**
 * Contact repository
 * 
 * @see CRMRepository
 */
export class ContactRepository extends CRMRepository<ContactDO, Mapping<Schema<ContactDO>>> {}

/**
 * 
 */
export const contactRepository = new ContactRepository(contactMapping);
