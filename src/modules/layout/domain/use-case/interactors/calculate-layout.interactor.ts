import { ILayoutRepository } from "../../repositories/layout.repository";
import { LayoutProps } from "../../types/layout.type";
import {
  CalculateLayoutCommand,
  CalculateLayoutInPort,
} from "../port/calculate-layout.in-port";

export class CalculateLayoutUseCase implements CalculateLayoutInPort {
  constructor(private readonly layoutRepository: ILayoutRepository) {}

  execute(request: CalculateLayoutCommand): LayoutProps {
    return this.layoutRepository.insertLayout(request);
  }
}
