import { Tags } from "../Constants/Tags";
import { DataType } from "./Type";

export class ArrayType extends DataType {
  Size: number = 1;
  Of: DataType;

  constructor(size: number, type: DataType) {
    super("[]", Tags.Index, size * type.Width);

    this.Of = type;
    this.Size = size;
  }

  override ToString(): string {
    return `[${this.Size}] ${this.Of}`;
  }
}
