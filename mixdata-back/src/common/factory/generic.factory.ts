// import { morphism } from 'morphism';
import mapper from "object-mapper";

export abstract class GenericFactory<TDo, TRequestDto, TResponseDto> {
  protected targetRequestDtoSchema;

  protected targetResponseDtoSchema;

  protected targetDoSchema;

  protected mapper;

  get responseDtoSchema() {
    return this.targetResponseDtoSchema;
  }

  constructor(targetDoSchema, targetRequestDtoSchema, targetResponseDtoSchema) {
    this.targetRequestDtoSchema = targetRequestDtoSchema;
    this.targetResponseDtoSchema = targetResponseDtoSchema;
    this.targetDoSchema = targetDoSchema;
    // this.mapper = morphism;
  }

  toRequestDto(source: TDo | TDo[]): TRequestDto {
    return null;
    // return this.mapper(this.targetRequestDtoSchema, source);
  }

  toResponseDto(source: TDo | TDo[]): TResponseDto {
    return null;
    // return this.mapper(this.targetResponseDtoSchema, source);
  }

  toDo(source: TRequestDto | TResponseDto | TRequestDto[] | TResponseDto[]): TDo {
    return mapper(source, this.targetDoSchema);
  }
}
