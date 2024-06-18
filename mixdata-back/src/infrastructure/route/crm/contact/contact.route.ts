// src/infrastructure/route/crm/contact/contact.route.ts
import { Router } from "express";
import { contactController } from "@/infrastructure/controller/crm/contact.controller";
import { schemaValidator } from "@/service/middleware/joi";

const contactRouters = () => {
    const router = Router();
    
    router.get('/', contactController.list);
    router.post('/', contactController.new);
    router.get('/:contactId', contactController.get);
    router.route('/:contactId')
        .post(contactController.update)
        .put(contactController.update)
        .patch(contactController.update);
    router.delete('/:contactId', contactController.delete);

    return router;
}

export const contactRouter = contactRouters();