import { Token } from "../../../Models/Token";
import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";
import { LogicalNode } from "./LogicalNode";

export class AndNode extends LogicalNode {
  constructor(
    token: Token,
    expression1: ExpressionNode,
    expression2: ExpressionNode
  ) {
    super(token, expression1, expression2);
  }
}
