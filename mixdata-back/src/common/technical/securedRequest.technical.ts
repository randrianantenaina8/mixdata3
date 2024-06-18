import { Request } from "express";

export interface SecuredRequest extends Request {
    user: { id: string },
}
