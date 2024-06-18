export class UserDO {
    id: string;
    email: string;
    password: string;
    username: string;
    firstname: string;
    roles: any[];
    activate: boolean;
    createdAt: Date;
    updatedAt: Date;
}