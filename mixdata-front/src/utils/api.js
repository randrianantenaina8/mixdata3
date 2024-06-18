import { API_URL } from "./constants";

const API_ENDPOINT = API_URL;
const CRM = API_ENDPOINT + '/crm',

//land endpoints
LAND_BASE_URL = CRM + '/lands'; 
const LAND_ENDPOINTS = {
    list: LAND_BASE_URL + '/',
    manage: LAND_BASE_URL + '/manage/:landId',

};

const CONTACT_BASE_URL = CRM + "/contacts";
const CONTACT_ENDPOINTS = {
    new: CONTACT_BASE_URL + "/",
    search: CONTACT_BASE_URL + "/",
    getById: CONTACT_BASE_URL + "/:contactId"
    
}

const AFFAIRE_BASE_URL = CRM + "/opportunities";
const AFFAIRE_ENDPOINTS = {
    new: AFFAIRE_BASE_URL + "/",
    search: AFFAIRE_BASE_URL + "/"
    
}

export {
    API_ENDPOINT, 
    LAND_ENDPOINTS,
    CONTACT_ENDPOINTS,
    AFFAIRE_ENDPOINTS
};
