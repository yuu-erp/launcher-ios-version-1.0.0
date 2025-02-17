import { UseCase } from "@core/domain/use-cases.port.base";
import { LayoutProps } from "../../types/layout.type";

export abstract class GetLayoutInPort implements UseCase<unknown, LayoutProps> {
  abstract execute(): LayoutProps;
}
