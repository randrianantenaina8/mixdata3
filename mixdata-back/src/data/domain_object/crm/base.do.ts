export abstract class BaseDO {
    _id: any;
    //
    tenantId: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    deletedAt: Date;
}
