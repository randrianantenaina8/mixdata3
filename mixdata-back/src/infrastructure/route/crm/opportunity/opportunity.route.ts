// src/infrastructure/route/crm/contact/contact.route.ts
import { Router } from "express";
import { opportunityController } from "@/infrastructure/controller/crm/opportunity.controller";
import { schemaValidator } from "@/service/middleware/joi";

const opportunityRouters = () => {
    const router = Router();
    
    router.get('/', opportunityController.list);
    router.post('/', opportunityController.new);
    router.get('/:opportunityId', opportunityController.get);
    router.route('/:opportunityId')
        .post(opportunityController.update)
        .put(opportunityController.update)
        .patch(opportunityController.update);
    router.delete('/:opportunityId', opportunityController.delete);

    return router;
}

export const opportunityRouter = opportunityRouters();