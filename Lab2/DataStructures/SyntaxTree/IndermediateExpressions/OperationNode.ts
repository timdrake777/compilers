import { Token } from "../../../Models/Token";
import { DataType } from "../../../Models/Type";
import { ExpressionNode } from "./ExpressionNode";
import { TempNode } from "./TempNode";

export class OperationNode extends ExpressionNode {
  constructor(token: Token, type: DataType | null) {
    super(token, type);
  }

  override Reduce() {
    let expression: ExpressionNode = this.Generate();
    let t: TempNode = new TempNode(this.Type)
    return t;
  }
}