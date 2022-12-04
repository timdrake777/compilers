import { DataTypes } from "../../../Constants/Types";
import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";
import { StatementNode } from "./StatementNode";

export class WhileNode extends StatementNode {
  Expression: ExpressionNode | null;
  Statement: StatementNode | null;

  constructor() {
    super();
    this.Expression = null;
    this.Statement = null;
  }

  Init(expression: ExpressionNode, statement: StatementNode) {
    this.Expression = expression;
    this.Statement = statement;
    if (expression.Type != DataTypes.Bool) {
      expression.Error("Boolean instruction is required in while statement");
    }
  }
}
