import { Mapper } from "@core/application/mappers/mapper.base";
import { DappEntity } from "../../domain/entities/dapp.entity";
import { DappResponse, DappTypeEnum } from "../../domain/entities/dapp.type";
import { DappPosition } from "../../domain/value-objects/dapp-position.value-object";
import { UniqueEntityID } from "@core/domain/entities";

export class DappMapper implements Mapper<DappEntity, DappResponse> {
  toDomain(response: DappResponse): DappEntity {
    const position = new DappPosition({
      width: response.position.width,
      height: response.position.height,
      x: response.position.x,
      y: response.position.y,
    });
    const dApplicationEntity = new DappEntity({
      id: new UniqueEntityID(response.id),
      props: {
        ...response,
        position: position,
      },
    });
    return dApplicationEntity;
  }

  toResponse(entity: DappEntity): DappResponse {
    const props = entity.getProps();
    return {
      id: props.id,
      name: props.name,
      logo: props.logo,
      url: props.url,
      page: props.page,
      position: props.position.raw(),
      type: props.type as DappTypeEnum,
      isFavorite: props.isFavorite,
    };
  }
}
