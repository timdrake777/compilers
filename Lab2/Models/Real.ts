import { Tags } from "../Constants/Tags";
import { Token } from "./Token";

export class Real extends Token {
  Value: number;

  constructor(value: number) {
    super(Tags.Real);

    this.Value = value;
  }

  override ToString(): string {
    return `${this.Value}`;
  }
}
