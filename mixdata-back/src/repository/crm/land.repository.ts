import { Schema } from "mongoose";
import { LandDO } from "@/data/domain_object/crm/land.do";
import { CRMRepository } from "./crm.repository";
import { landMapping } from "@/data/mappings/crm/land";
import { Mapping } from "@/data/mappings/crm/base";

/**
 * Land repository
 * 
 * @see CRMRepository
 */
export class LandRepository extends CRMRepository<LandDO, Mapping<Schema<LandDO>>> {}

/**
 * 
 */
export const landRepository = new LandRepository(landMapping);
