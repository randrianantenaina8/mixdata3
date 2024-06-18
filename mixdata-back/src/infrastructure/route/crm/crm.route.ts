import { Router } from "express";
import { landRouter } from "./land/land.route";
import { contactRouter } from "./contact/contact.route";
import { opportunityRouter } from "./opportunity/opportunity.route";

const CRMRouters = () => {
    const router = Router();

   router.use('/lands', landRouter);
   router.use('/contacts', contactRouter);
   router.use('/opportunities', opportunityRouter);

    return router;
}

export const CRMRouter = CRMRouters();

