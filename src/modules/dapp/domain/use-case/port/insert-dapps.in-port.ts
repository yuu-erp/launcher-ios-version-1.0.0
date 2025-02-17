import { UseCase } from "@core/domain/use-cases.port.base";
import { DappEntity } from "../../entities/dapp.entity";
export abstract class InsertDappsInPort
  implements UseCase<DappEntity[], DappEntity[]>
{
  abstract execute(request: DappEntity[]): DappEntity[];
}
