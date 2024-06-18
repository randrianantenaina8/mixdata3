import { Schema } from 'mongoose';
import { LandDO, OwnedLandDO } from "@/data/domain_object/crm/land.do";
import { Mapping, baseMapping } from "./base";

const getLandMapping = () => {
    return {
        ...baseMapping,
        code: String,
        externalId: String,
    }
}

const getOwnedLandMapping = () => {
    const landMapping = getLandMapping();
    return {
        ...landMapping,
        type: String,
    }
}

export const landMapping = new Mapping("land", new Schema<LandDO>(getLandMapping(), { timestamps: true }));
export const ownedLandMapping = new Mapping("owned_land", new Schema<OwnedLandDO>(getOwnedLandMapping(), { timestamps: true }));
