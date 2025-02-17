import { StoragePort } from "@core/infrastructure/storage/storage.port";
import { LayoutController } from "./layout.controller";
import { LayoutRepositoryImpl } from "../infrastructure/layout.impl.reposity";
import { CalculateLayoutUseCase } from "../domain/use-case/interactors/calculate-layout.interactor";
import { CalculateLayoutInPort } from "../domain/use-case/port/calculate-layout.in-port";
import { GetLayoutInPort } from "../domain/use-case/port/get-layout.in-port";
import { GetLayoutUseCase } from "../domain/use-case/interactors/get-layout.interactor";

export class LayoutModule {
  private static instance: LayoutModule;
  private layoutController: LayoutController;
  private layoutRepositoryImpl: LayoutRepositoryImpl;
  private calculateLayoutUseCase: CalculateLayoutInPort;
  private getLayoutUseCase: GetLayoutInPort;
  constructor(private readonly storage: StoragePort) {
    this.layoutRepositoryImpl = new LayoutRepositoryImpl(this.storage);
    this.calculateLayoutUseCase = new CalculateLayoutUseCase(
      this.layoutRepositoryImpl
    );
    this.getLayoutUseCase = new GetLayoutUseCase(this.layoutRepositoryImpl);
    this.layoutController = new LayoutController(
      this.calculateLayoutUseCase,
      this.getLayoutUseCase
    );
  }

  public static getInstance(storage: StoragePort): LayoutModule {
    if (!LayoutModule.instance) {
      LayoutModule.instance = new LayoutModule(storage);
    }
    return LayoutModule.instance;
  }

  public getController(): LayoutController {
    return this.layoutController;
  }
}
