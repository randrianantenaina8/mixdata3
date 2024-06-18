// src/infrastructure/route/crm/land/land.route.ts
import { Router } from "express";
import { landController } from "@/infrastructure/controller/crm/land.controller";
import { schemaValidator } from "@/service/middleware/joi";
import { landManagementRequestDTOSchema } from "@/common/validator/joi/crm/land.validator";

const landRouters = () => {
    const router = Router();

    router.post('/:landId/manage', schemaValidator(landManagementRequestDTOSchema), landController.manage);

    return router;
}

export const landRouter = landRouters();