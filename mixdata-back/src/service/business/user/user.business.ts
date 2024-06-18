import bcrypt from "bcrypt";

import { userFactory, UserFactory } from "../../../common/factory/user/user.factory";
import { UserDO } from "../../../data/domain_object/user.do";
import { ResponseDTO } from "../../../data/dto/response.dto";
import { UserDTO } from "../../../data/dto/user/user.dto";
import { userRepository, UserRepository } from "../../../repository/user.repository";
import { GenericBusiness } from "../generic.business";
import { configs } from "../../../data/constants/configs";
import { userMapping } from "../../../data/mappings/user";
// import { StrictSchema } from "morphism";

export class UserBusiness extends GenericBusiness<
  UserDO,
  string,
  UserDTO,
  UserDTO,
  UserRepository,
  UserFactory
> {

    private userRepository;

  constructor(userRepo: UserRepository, factory: UserFactory, name: string) {
    super(userRepo, factory, name);
    this.userRepository = userRepo;
  }

  async inscription(userDto: UserDTO): Promise<ResponseDTO> {

    try {
      const found = await this.userRepository.findOne("users", { username: `${userDto.username}`.toLowerCase() });
      if (found?.total > 0) {
        return new ResponseDTO({
          details: ["Un utilisateur avec ce pseudo existe déjà"],
          error: true,
        });
      }
      const foundMail = await this.userRepository.exactOne("users", {
        email: `${userDto.email}`.toLowerCase(),
      });
      if (foundMail?.total > 0) {
        return new ResponseDTO({
          details: ["Un utilisateur avec cet email existe déjà"],
          error: true,
        });
      }
    } catch (err) {
      if (err.statusCode === 404) {
        const index = await this.userRepository.createIndex("users", userMapping);
        console.log('index ready', index);
      }
    }

    const salt = await bcrypt.genSalt(Number(configs.salt));
    const hashPassword = await bcrypt.hash(userDto.password, salt);
    const usertmp: UserDTO = { ...userDto, password: hashPassword };
    const newAcount: UserDO = this.factory.toDo(usertmp);
    const res = await this.userRepository.save("users", [newAcount]);
    return new ResponseDTO({ error: false, details: { ...res, id: newAcount.id } });
  }

  async deleteIndex(indexName: string) {
    return new ResponseDTO({ error: false, details: await this.userRepository.delete(indexName) });
  }

  async getPerPage(size, page) {
      let payload = {
        query: {
          match_all: {}
        },
        size: size,
        // from: null
      };
      // if (page > 0 ) {
      //   payload = {
      //     ...payload,
      //     from: (page <= 0 ? 1 : page) * size
      //   }
      // }
    return await this.userRepository.search('users', payload);
  }

  async deleteUser(id) {
    return await this.userRepository.deleteOne('users', id);
  }
}

export const userBusiness = new UserBusiness(
    // getCustomRepository(UserRepository),
    userRepository,
    userFactory,
    'user'
);