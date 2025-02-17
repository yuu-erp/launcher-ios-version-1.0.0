import { Entity } from "@core/domain/entities";

export interface Mapper<
  DomainEntity extends Entity<unknown>,
  ResponseDTO = unknown
> {
  toDomain(response: ResponseDTO): DomainEntity;
  toResponse(entity: DomainEntity): ResponseDTO;
}
