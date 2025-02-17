import { CalculateLayoutInPort } from "../domain/use-case/port/calculate-layout.in-port";
import { GetLayoutInPort } from "../domain/use-case/port/get-layout.in-port";
import { CalculateLayoutService } from "./calculate-layout.service";

export class LayoutController {
  constructor(
    private readonly calculateLayoutUseCase: CalculateLayoutInPort,
    private readonly getLayoutUseCase: GetLayoutInPort
  ) {}

  calculate() {
    const layout = CalculateLayoutService.calculateLayout();
    return this.calculateLayoutUseCase.execute(layout);
  }

  getLayout() {
    return this.getLayoutUseCase.execute();
  }
}
