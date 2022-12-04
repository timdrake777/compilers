import { Token } from "../../../Models/Token";
import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";
import { LogicalNode } from "./LogicalNode";

export class NotNode extends LogicalNode {
  constructor(token: Token, expression1: ExpressionNode) {
    super(token, expression1, expression1);
  }

  override ToString() {
    return `${this.Operation} ${this.Expression1}`;
  }
}
