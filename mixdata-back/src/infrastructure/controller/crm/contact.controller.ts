// src/infrastructure/controller/crm/contact.controller.ts

import { HttpStatus } from "@/data/constants/httpStatus";
import { NextFunction, Response } from "express";
import { logger } from "@/common/logger";
import { SecuredRequest } from "@/common/technical/securedRequest.technical";
import { contactBusiness, ContactBusiness } from "@/service/business/crm/contact/contact.business";
import { Exception } from "@/service/middleware/exception-handler";

/**
 * CRM Contact Controller
 */
export class ContactController {
    private service: ContactBusiness;

    /**
     * Constructor
     * @param service 
     */
    constructor(service: ContactBusiness) {
        this.service = service;
    }

    list = async (req: SecuredRequest, res: Response, next: NextFunction) => {
        try {
            const filters = req.query.filters || [];
            const sorting = req.query.sorting || [];
            const offset = +req.query.offset || -1;
            const limit = +req.query.limit || -1;
            const records = await this.service.secured(req.user.id).search(filters, sorting, limit, offset);
            res.locals.data = {
                records: records.records,
                count: records.count,
                total_count: records.totalCount, 
                has_more: records.hasMore,
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    get = async (req: SecuredRequest, res: Response, next: NextFunction) => {
        try {
            const contactId = req.params.contactId;
            const result = await this.service.secured(req.user.id).search([{ _id: contactId }]);

            if (result.records.length <= 0) {
                throw new Exception(404, 'Not found.');
            }

            const records = result.records;

            res.locals.data = {
                records: records,
                count: records.length,
                total_count: records.length, 
                has_more:false,
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    new = async (req: SecuredRequest, res: Response, next: NextFunction) => {
        try {
            const contactData = req.body;
            const result = await this.service.secured(req.user.id).create(contactData);

            res.locals.data = {
                records: [result],
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    update = async (req: SecuredRequest, res: Response, next: NextFunction) => {
        try {
            const contactId = req.params.contactId;
            const foundContact = await this.service.secured(req.user.id).search([{ _id: contactId }]);

            if (foundContact.records.length <= 0) {
                throw new Exception(404, 'Not found');
            }

            const contact = foundContact.records[0];
            const contactData = req.body;
            const result = await this.service.secured(req.user.id).update(contact, contactData);

            res.locals.data = {
                records: result,
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: SecuredRequest, res: Response, next: NextFunction) => {
        try {
            const contactId = req.params.contactId;
            const foundContact = await this.service.secured(req.user.id).search([{ _id: contactId }], [], -1, -1, true);

            if (foundContact.records.length <= 0) {
                throw new Exception(404, 'Not found');
            }

            const contact = foundContact.records[0];
            const result = await this.service.secured(req.user.id).delete(contact);

            res.locals.data = {
                records: result,
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}

export const contactController = new ContactController(contactBusiness)
