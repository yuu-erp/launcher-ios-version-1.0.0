import { DappEntity } from "../../entities/dapp.entity";
import { IDappRepository } from "../../repositories/dapp.repository";
import { GetDappsInPort } from "../port/get-dapps.in-port";

export class GetDappsUseCase implements GetDappsInPort {
  constructor(private readonly dappRepository: IDappRepository) {}
  execute(): DappEntity[] {
    return this.dappRepository.findAll();
  }
}
