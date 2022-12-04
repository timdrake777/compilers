import { DataTypes } from "../../../Constants/Types";
import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";
import { StatementNode } from "./StatementNode";

export class IfNode extends StatementNode {
  Expression: ExpressionNode;
  Statement: StatementNode;

  constructor(expression: ExpressionNode, statement: StatementNode) {
    super();
    this.Expression = expression;
    this.Statement = statement;

    if (this.Expression.Type != DataTypes.Bool) {
      this.Expression.Error(`If statement requires boolean construction`);
    }
  }
}
