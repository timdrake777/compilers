import { Token } from "../../../Models/Token";
import { DataType } from "../../../Models/Type";
import { DataTypes } from "../../../Constants/Types";
import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";

export class LogicalNode extends ExpressionNode {
  Expression1: ExpressionNode;
  Expression2: ExpressionNode;

  constructor(
    token: Token,
    expression1: ExpressionNode,
    expression2: ExpressionNode
  ) {
    super(token, null);
    this.Expression1 = expression1;
    this.Expression2 = expression2;

    this.Type = this.Check(this.Expression1.Type, this.Expression2.Type);
    if (this.Type == null) {
      console.error("Type error");
    }
  }

  Check(p1: DataType | null, p2: DataType | null) {
    if (p1 == DataTypes.Bool && p2 == DataTypes.Bool) {
      return DataTypes.Bool;
    }
    return null;
  }
}
