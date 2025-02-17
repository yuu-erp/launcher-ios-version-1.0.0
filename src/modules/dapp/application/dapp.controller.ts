import { CreateDappInPort } from "../domain/use-case/port/create-dapp.in-port";
import { GetDappsInPort } from "../domain/use-case/port/get-dapps.in-port";
import { InsertDappsInPort } from "../domain/use-case/port/insert-dapps.in-port";
import { UpdateDappInPort } from "../domain/use-case/port/update-dapp.in-port";
import { DappPosition } from "../domain/value-objects/dapp-position.value-object";
import { CreateDappDto } from "./dtos/create-dapp.dto";
import { InsertDappsDto } from "./dtos/insert-dapps.dto";
import { UpdateDappDto } from "./dtos/update-dapp.dto";
import { DappMapper } from "./mappers/dapp.mapper";

export class DappController {
  constructor(
    private readonly mapper: DappMapper,
    private readonly createDappUseCase: CreateDappInPort,
    private readonly updateDappUseCase: UpdateDappInPort,
    private readonly insertDappsUseCase: InsertDappsInPort,
    private readonly getDappsUseCase: GetDappsInPort
  ) {}

  createDapp(payload: CreateDappDto) {
    const command = {
      ...payload,
      position: new DappPosition(payload.position),
    };
    const dappEntity = this.createDappUseCase.execute(command);
    return this.mapper.toResponse(dappEntity);
  }
  updateDapp(payload: UpdateDappDto) {
    const dappEntity = this.updateDappUseCase.execute(payload);
    return this.mapper.toResponse(dappEntity);
  }
  insertDapps(payload: InsertDappsDto) {
    this.insertDappsUseCase.execute(payload.map(this.mapper.toDomain));
    return payload;
  }
  getDapps() {
    return this.getDappsUseCase.execute();
  }
}
