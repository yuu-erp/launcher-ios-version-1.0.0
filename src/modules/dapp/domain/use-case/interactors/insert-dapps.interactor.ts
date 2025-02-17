import { DappEntity } from "../../entities/dapp.entity";
import { IDappRepository } from "../../repositories/dapp.repository";
import { InsertDappsInPort } from "../port/insert-dapps.in-port";

export class InsertDappsUseCase implements InsertDappsInPort {
  constructor(private readonly dappRepository: IDappRepository) {}

  execute(request: DappEntity[]): DappEntity[] {
    return this.dappRepository.insertMany(request);
  }
}
