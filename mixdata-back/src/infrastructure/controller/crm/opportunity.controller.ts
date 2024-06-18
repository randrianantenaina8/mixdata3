// src/infrastructure/controller/crm/contact.controller.ts

import { HttpStatus } from "@/data/constants/httpStatus";
import { NextFunction, Response } from "express";
import { logger } from "@/common/logger";
import { SecuredRequest } from "@/common/technical/securedRequest.technical";
import { opportunityBusiness, OpportunityBusiness } from "@/service/business/crm/opportunity/opportunity.business";
import { Exception } from "@/service/middleware/exception-handler";

/**
 * CRM Opportunity Controller
 */
export class OpportunityController {
    private service: OpportunityBusiness;

    /**
     * Constructor
     * @param service 
     */
    constructor(service: OpportunityBusiness) {
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
            const opportunityId = req.params.opportunityId;
            const result = await this.service.secured(req.user.id).search([{ _id: opportunityId }]);

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
            const opportunityData = req.body;
            const result = await this.service.secured(req.user.id).create(opportunityData);

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
            const opportunityId = req.params.opportunityId;
            const foundOpportunity = await this.service.secured(req.user.id).search([{ _id: opportunityId }]);

            if (foundOpportunity.records.length <= 0) {
                throw new Exception(404, 'Not found');
            }

            const opportunity = foundOpportunity.records[0];
            const opportunityData = req.body;
            const result = await this.service.secured(req.user.id).update(opportunity, opportunityData);

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
            const opportunityId = req.params.opportunityId;
            const foundOpportunity = await this.service.secured(req.user.id).search([{ _id: opportunityId }], [], -1, -1, true);

            if (foundOpportunity.records.length <= 0) {
                throw new Exception(404, 'Not found');
            }

            const opportunity = foundOpportunity.records[0];
            const result = await this.service.secured(req.user.id).delete(opportunity);

            res.locals.data = {
                records: result,
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}

export const opportunityController = new OpportunityController(opportunityBusiness)
