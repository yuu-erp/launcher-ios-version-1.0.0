import { invariant } from "@techmely/utils";
import { ArgumentNotProvidedException } from "@core/exceptions";
import { ValueObject } from "@core/domain/entities/value-object.base";
import { IDappPosition } from "../entities/dapp.type";

export class DappPosition extends ValueObject<IDappPosition> {
  protected validate(props: IDappPosition): void {
    const { width, height, x, y } = props;
    invariant(
      typeof width === "number" && width > 0,
      new ArgumentNotProvidedException("width cannot be empty!")
    );
    invariant(
      typeof height === "number" && height > 0,
      new ArgumentNotProvidedException("height cannot be empty!")
    );
    invariant(
      typeof x === "number",
      new ArgumentNotProvidedException("x cannot be empty!")
    );
    invariant(
      typeof y === "number",
      new ArgumentNotProvidedException("y cannot be empty!")
    );
  }
}
