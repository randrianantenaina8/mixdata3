// src/infrastructure/controller/crm/land.controller.ts

import { HttpStatus } from "@/data/constants/httpStatus";
import { NextFunction, Response } from "express";
import { logger } from "@/common/logger";
import { landBusiness, LandBusiness } from "@/service/business/crm/land/land.business";
import { LandManagementRequestDTO } from "@/data/dto/crm/land/landManagement-request.dto";
import { SecuredRequest } from "@/common/technical/securedRequest.technical";
import { Exception } from "@/service/middleware/exception-handler";

/**
 * CRM Land Controller
 */
export class LandController {
    private service: LandBusiness;

    constructor(service: LandBusiness) {
        this.service = service;
    }

    manage = async (req: SecuredRequest, res: Response, next: NextFunction) => {
        const landId = req.params.landId;

        if (!landId) {
            throw new Exception(404, 'Not found.');
        }

        const data: LandManagementRequestDTO = req.body;
        const response = await this.service.secured(req.user.id).manage({ ...data, landId });

        res.locals.data = {
            data,
            response,
        };

        next();
    }
}

export const landController = new LandController(landBusiness)