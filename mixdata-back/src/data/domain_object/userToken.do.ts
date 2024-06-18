export class UserTokenDO {
    userId: string;
    token: string;
    createdAt: Date;

    constructor({ userId, token, createdAt }) {
        this.userId = userId;
        this.token = token;
        this.createdAt = createdAt;
    }
}