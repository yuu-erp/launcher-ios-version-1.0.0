import { DappEntity } from "../../entities/dapp.entity";
import { IDappRepository } from "../../repositories/dapp.repository";
import {
  CreateDappCommand,
  CreateDappInPort,
} from "../port/create-dapp.in-port";

export class CreateDappUseCase implements CreateDappInPort {
  constructor(private readonly dappRepository: IDappRepository) {}
  execute(request: CreateDappCommand): DappEntity {
    const dapp = DappEntity.create(request);
    return this.dappRepository.insert(dapp);
  }
}
