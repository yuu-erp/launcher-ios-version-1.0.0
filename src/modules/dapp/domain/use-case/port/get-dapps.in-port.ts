import { UseCase } from "@core/domain/use-cases.port.base";
import { DappEntity } from "../../entities/dapp.entity";

export abstract class GetDappsInPort implements UseCase<unknown, DappEntity[]> {
  abstract execute(): DappEntity[];
}
