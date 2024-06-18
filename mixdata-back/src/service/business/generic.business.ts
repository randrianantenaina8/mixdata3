import { GenericFactory } from '../../common/factory/generic.factory';
import { HttpStatus } from '../../data/constants/httpStatus';
// import { Exception } from '../../service/middleware/exception-handler';

export abstract class GenericBusiness<
  TDo,
  TId,
  TRequestDto,
  TResponseDto,
//   TRepository extends Repository<TDo>,
  TRepository,
  TFactory extends GenericFactory<TDo, TRequestDto, TResponseDto>
> {

  protected repository: TRepository;

  protected factory: TFactory;

  protected name: string;

  constructor(
    repository: TRepository,
    factory: TFactory, name: string) {
    this.repository = repository;
    this.factory = factory;
    this.name = name;
  }

  async create(dto: TRequestDto | TRequestDto[]): Promise<TResponseDto> {
    try {
        const entity = this.factory.toDo(dto);
        // const result = this.repository.save();
        // const result = this.repository.create(entity);
        return this.factory.toResponseDto(null);
    } catch (error) {
    return Promise.reject(error);
    }
  }

  async update(id: number | string, dto: TRequestDto): Promise<any> {
    return Promise.reject("error");
    // try {
    //     const entity = this.factory.toDo(dto);
    //   const found = await this.repository.findOneOrFail(id);
    //   const result = await this.repository.save(Object.assign(found, entity));

    //   return this.factory.toResponseDto(result);
    // } catch (error) {
    //   return Promise.reject(error);
    // }
  }

  async delete(id: TId): Promise<any> {
    return Promise.reject("error");
    // try {
    //   const { affected } = await this.repository.delete(id);

    //   if (affected) {
    //     return id;
    //   }

    // //   throw new Exception(HttpStatus.BAD_REQUEST, `id: ${id} introuvable`);
    // } catch (error) {
    //   return Promise.reject(error);
    // }
  }

//   findById(id: TId): Promise<any> {
//     return this.findOne(id);
//   }

//   findOne(option: FindConditions<TDo>): Promise<any> {
//     return this.repository.findOneOrFail(option);
//   }

  findAll(): Promise<any> {
    return Promise.reject("error");
    // return this.repository.find();
  }

}