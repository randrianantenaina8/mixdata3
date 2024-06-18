import { cityMapping } from "../mappings/city";
import { landMapping } from "../mappings/lands";
import { regionMapping } from "../mappings/region";
import { userMapping } from "../mappings/user";
import {transactionMapping} from "../mappings/transactions";
import {faosMapping} from "../mappings/faos";

export const mappings = {
    users: userMapping,
    lands: landMapping,
    regions: regionMapping,
    cities: cityMapping,
    transactions: transactionMapping,
    faos: faosMapping
};