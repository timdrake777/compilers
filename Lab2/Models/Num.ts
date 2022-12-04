import { Tags } from "../Constants/Tags";
import { Token } from "./Token";

export class Num extends Token {
  Value: number;

  constructor(value: number) {
    super(Tags.Num);

    this.Value = value;
  }

  override ToString(): string {
    return `${this.Value}`;
  }
}
