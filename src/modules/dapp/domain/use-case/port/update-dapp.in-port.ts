import { UseCase } from "@core/domain/use-cases.port.base";
import { DappEntity } from "../../entities/dapp.entity";
import { DappResponse } from "../../entities/dapp.type";

export interface UpdateDappCommand extends Partial<DappResponse> {
  id: number;
}

export abstract class UpdateDappInPort
  implements UseCase<UpdateDappCommand, DappEntity | void>
{
  abstract execute(request: UpdateDappCommand): DappEntity;
}
