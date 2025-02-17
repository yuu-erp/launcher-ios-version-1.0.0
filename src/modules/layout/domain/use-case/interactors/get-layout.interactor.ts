import { ILayoutRepository } from "../../repositories/layout.repository";
import { LayoutProps } from "../../types/layout.type";
import { GetLayoutInPort } from "../port/get-layout.in-port";

export class GetLayoutUseCase implements GetLayoutInPort {
  constructor(private readonly layoutRepository: ILayoutRepository) {}

  execute(): LayoutProps {
    return this.layoutRepository.getLayout();
  }
}
