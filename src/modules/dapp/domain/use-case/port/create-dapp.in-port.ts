import { UseCase } from "@core/domain/use-cases.port.base";
import { DappProps } from "../../entities/dapp.type";
import { DappEntity } from "../../entities/dapp.entity";

export interface CreateDappCommand extends DappProps {}

export abstract class CreateDappInPort
  implements UseCase<CreateDappCommand, DappEntity>
{
  abstract execute(request: CreateDappCommand): DappEntity;
}
