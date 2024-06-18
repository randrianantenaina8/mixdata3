import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authFactory, AuthFactory } from "../../../common/factory/user/auth.factory";
import { UserTokenDO } from "../../../data/domain_object/userToken.do";
import { AuthDto } from "../../../data/dto/user/auth.dto";
import { UserDTO } from "../../../data/dto/user/user.dto";
import { userTokenRepository, UserTokenRepository } from "../../../repository/userToken.repository";
import { GenericBusiness } from "../generic.business";
import { configs } from "../../../data/constants/configs";
import { userRepository, UserRepository } from "../../../repository/user.repository";
import { ResponseDTO } from "../../../data/dto/response.dto";

export class AuthBusiness extends GenericBusiness<
  UserTokenDO,
  string,
  UserDTO,
  AuthDto,
  UserRepository,
  AuthFactory
> {

    private userRepository;

  constructor(authRepo: UserRepository, factory: AuthFactory, name: string) {
    super(authRepo, factory, name);
    this.userRepository = authRepo;
  }

  async login(user: any) {
    const found = await this.userRepository.findOne("users", {  username: `${user.username}`.toLowerCase() });

    console.log('found', found);
        if (found.total <= 0) {
            return new ResponseDTO({ details: ["Invalid username or password"], error: true })
        }

        const verifiedPassword = await bcrypt.compare(
            user.password,
            found.results._source.password
        );
        if (!verifiedPassword) {
            return new ResponseDTO({ details: ["Invalid username or password"], error: true })
        }

        const res = await this.generateTokens(found.results);

        return new ResponseDTO({ error: false, details: { ...res } });
  }

  async generateTokens(user) {
    
        try {
            const payload = { id: user._source.id, roles: user._source.roles };
            const accessToken = jwt.sign(
                payload,
                configs.jwtSecret,
                { expiresIn: configs.jwtExpiration }
            );
            const refreshToken = jwt.sign(
                payload,
                configs.jwtRefreshSecret,
                { expiresIn: configs.jwtRefreshTokenExpiration }
            );
            await this.userRepository.update("users", user._id, { token: accessToken, updatedAt: new Date() });
            return Promise.resolve({ accessToken, refreshToken });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    async refreshToken(refreshToken) {
        const found = await this.userRepository.matchOne("users", { token: `${refreshToken}` });

        if (found.total <= 0) {
            return new ResponseDTO({ details: ["Invalid refresh token"], error: true })
        }
        
        try {
            const tokenDetails = jwt.verify(
                refreshToken,
                configs.jwtRefreshSecret,
                { expiresIn: configs.jwtExpiration }
            );
            
            const payload = { id: tokenDetails.id, roles: tokenDetails.roles };
            const accessToken = jwt.sign(
                payload,
                configs.jwtSecret,
                { expiresIn: configs.jwtExpiration }
            );
            return new ResponseDTO({ error: false, details: { accessToken, refreshToken: accessToken } });
        } catch (error) {
            return new ResponseDTO({ details: ["Invalid email or password"], error: true })
        }
    }

    async logout(token) {
        const found = await this.userRepository.matchOne("users", { token: `${token}` });

        if (found.total <= 0) {
            return new ResponseDTO({ error: false, details: ["Logged Out Sucessfully"] });
        }
        
        try {
            await this.userRepository.update("users", found.results._id, { token: null, updatedAt: new Date() });
            return new ResponseDTO({ error: false, details: ["Logged Out Sucessfully"] });
        } catch (error) {
            return new ResponseDTO({ details: ["Internal server"], error: true })
        }
    }

}

export const authBusiness = new AuthBusiness(
    userRepository,
    authFactory,
    'auth'
);