import { AggregateRoot, UniqueEntityID } from "@core/domain/entities";
import { DappProps } from "./dapp.type";

export class DappEntity extends AggregateRoot<DappProps> {
  static create(createProps: DappProps) {
    const id = new UniqueEntityID(createProps.id);
    const props: DappProps = { ...createProps };
    const dapp = new DappEntity({ id, props });
    return dapp;
  }
  validate(): void {
    // throw new Error("Method not implemented.");
  }
}
