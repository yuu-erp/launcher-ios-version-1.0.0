import { ArgumentNotProvidedException } from "@core/exceptions";
import { DappEntity } from "../../entities/dapp.entity";
import { IDappRepository } from "../../repositories/dapp.repository";
import { DappPosition } from "../../value-objects/dapp-position.value-object";
import {
  UpdateDappCommand,
  UpdateDappInPort,
} from "../port/update-dapp.in-port";

export class UpdateDappUseCase implements UpdateDappInPort {
  constructor(private readonly dappRepository: IDappRepository) {}

  execute(request: UpdateDappCommand): DappEntity {
    const existingDapp = this.dappRepository.findById(request.id);
    if (!existingDapp) {
      throw new ArgumentNotProvidedException("Dapp not found");
    }
    const props = existingDapp.getProps();
    const updatedProps = {
      ...props,
      ...request,
      position: request.position
        ? new DappPosition(request.position)
        : props.position,
    };

    const updatedDapp = DappEntity.create(updatedProps);
    this.dappRepository.update(updatedDapp);
    return updatedDapp;
  }
}
