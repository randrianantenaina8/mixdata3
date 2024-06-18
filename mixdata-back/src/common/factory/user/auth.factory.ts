import { UserTokenDO } from "../../../data/domain_object/userToken.do";
import { AuthDto } from "../../../data/dto/user/auth.dto";
import { UserDTO } from "../../../data/dto/user/user.dto";
import { GenericFactory } from "../generic.factory";

const commonSchema = {
  email: 'email',
  password: 'password',
  username: 'username',
  firstname: 'firstname'
};

export class AuthFactory extends GenericFactory<
    UserTokenDO,
  UserDTO,
  AuthDto
> {
    getUserToken(userId: string, refreshToken: string) {
      return new UserTokenDO({ userId: userId, token: refreshToken, createdAt: new Date() })
    }
}
    
export const authFactory = new AuthFactory(commonSchema, commonSchema, commonSchema);