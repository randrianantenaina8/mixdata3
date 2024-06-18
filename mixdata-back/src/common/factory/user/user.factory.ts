import { roles } from "../../../data/constants/roles";
import { UserDO } from "../../../data/domain_object/user.do";
import { UserTokenDO } from "../../../data/domain_object/userToken.do";
import { AuthDto } from "../../../data/dto/user/auth.dto";
import { UserDTO } from "../../../data/dto/user/user.dto";
import { GenericFactory } from "../generic.factory";
import mapper from "object-mapper";
import {v4 as uuidv4} from 'uuid';
// import { StrictSchema, morphism, createSchema, Schema } from 'morphism';

const schema = {
  email: 'email',
  password: 'password',
  username: 'username',
  firstname: 'firstname',
  roles: "roles"
};

const fromDTOSchema = {
  id: {
    key: "id",
    transform: function (value: string) {
      return !value ? uuidv4(): value;
    }
  },
  email: 'email',
  password: 'password',
  username: {
    key: 'username',
    transform: function (value: string) {
      return value != undefined && value != null ? value.toLowerCase(): "";
    }
  },
  firstname: 'firstname',
  roles: [{
    key: "roles",
    transform: (value: any[]) => {
      return !value || value?.length == 0 ? [{ name: roles.default }]: value;
    }
  }],
  activate: {
    key: "activate",
    transform: function (value: string) {
      return value != undefined && value != null ? value: true;
    }
  },
  updatedAt: {
    key: "updatedAt",
    transform: function (value: Date) {
      return value ? value: new Date();
    }
  },
  createdAt: {
    key: "createdAt",
    transform: function (value: Date) {
      return value ? value: new Date();
    }
  }
};
// const schema = { ...commonSchema, password: 'password', token: 'token' };
// const userSchema: StrictSchema<UserDO, UserDTO> = { ...schema };



export class UserFactory extends GenericFactory<
  UserDO,
  UserDTO,
  UserDTO
> {
    getUserToken(userId: string, refreshToken: string) {
      // return new UserDO({ userId: userId, token: refreshToken, createdAt: new Date() })
      return null;
    }

    toDoTest(dataInput: UserDTO): UserDO {
      return mapper(dataInput, fromDTOSchema);
    }
}
    
export const userFactory = new UserFactory(fromDTOSchema, fromDTOSchema, fromDTOSchema);