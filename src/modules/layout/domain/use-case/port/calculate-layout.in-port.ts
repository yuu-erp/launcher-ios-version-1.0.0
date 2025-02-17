import { UseCase } from "@core/domain/use-cases.port.base";
import { LayoutProps } from "../../types/layout.type";
export interface CalculateLayoutCommand extends LayoutProps {}

export abstract class CalculateLayoutInPort
  implements UseCase<CalculateLayoutCommand, LayoutProps>
{
  abstract execute(request: CalculateLayoutCommand): LayoutProps;
}
