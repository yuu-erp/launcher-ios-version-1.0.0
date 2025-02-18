import { StoragePort } from "@core/infrastructure/system-core/system-core.port";
import { IDappRepository } from "../domain/repositories/dapp.repository";
import { CreateDappUseCase } from "../domain/use-case/interactors/create-dapp.interactor";
import { GetDappsUseCase } from "../domain/use-case/interactors/get-dapps.interactor";
import { InsertDappsUseCase } from "../domain/use-case/interactors/insert-dapps.interactor";
import { UpdateDappUseCase } from "../domain/use-case/interactors/update-dapp.interactor";
import { CreateDappInPort } from "../domain/use-case/port/create-dapp.in-port";
import { GetDappsInPort } from "../domain/use-case/port/get-dapps.in-port";
import { InsertDappsInPort } from "../domain/use-case/port/insert-dapps.in-port";
import { UpdateDappInPort } from "../domain/use-case/port/update-dapp.in-port";
import { DappRepositoryImpl } from "../infrastructure/dapp.impl.reposity";
import { DappController } from "./dapp.controller";
import { DappMapper } from "./mappers/dapp.mapper";

export class DappModule {
  private static instance: DappModule;
  private dappRepositoryImpl: IDappRepository;
  private dappMapper: DappMapper;
  private createDappUseCase: CreateDappInPort;
  private updateDappUseCase: UpdateDappInPort;
  private getDappsUseCase: GetDappsInPort;
  private insertDappsUseCase: InsertDappsInPort;
  private dappController: DappController;

  constructor(private readonly storage: StoragePort) {
    this.dappMapper = new DappMapper();
    this.dappRepositoryImpl = new DappRepositoryImpl(
      this.storage,
      this.dappMapper
    );
    this.createDappUseCase = new CreateDappUseCase(this.dappRepositoryImpl);
    this.updateDappUseCase = new UpdateDappUseCase(this.dappRepositoryImpl);
    this.getDappsUseCase = new GetDappsUseCase(this.dappRepositoryImpl);
    this.insertDappsUseCase = new InsertDappsUseCase(this.dappRepositoryImpl);

    this.dappController = new DappController(
      this.dappMapper,
      this.createDappUseCase,
      this.updateDappUseCase,
      this.insertDappsUseCase,
      this.getDappsUseCase
    );

    // Lưu instance vào biến static
    DappModule.instance = this;
  }

  public static getInstance(storage: StoragePort): DappModule {
    if (!DappModule.instance) {
      DappModule.instance = new DappModule(storage);
    }
    return DappModule.instance;
  }

  public getController(): DappController {
    return this.dappController;
  }
}
