import { DataTypes } from "../../../Constants/Types";
import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";
import { StatementNode } from "./StatementNode";

export class ElseNode extends StatementNode {
  Expression: ExpressionNode;
  Statement1: StatementNode;
  Statement2: StatementNode;

  constructor(
    expression: ExpressionNode,
    statement1: StatementNode,
    statement2: StatementNode
  ) {
    super()
    this.Expression = expression;
    this.Statement1 = statement1;
    this.Statement2 = statement2;

    if (expression.Type != DataTypes.Bool) {
      expression.Error("Boolean statement required in if statement");
    }
  }
}
