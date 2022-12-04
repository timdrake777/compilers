import { Words } from "../../../Constants/Words";
import { DataType } from "../../../Models/Type";
import { ExpressionNode } from "./ExpressionNode";

export class TempNode extends ExpressionNode {
  Count: number = 0;
  Number: number = 0;

  constructor(dataType: DataType | null) {
    super(Words.Temp, dataType);
    this.Number = ++this.Count;
  }

  override ToString() {
    return `t ${this.Number}`;
  }
}
