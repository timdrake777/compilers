import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";
import { StatementNode } from "./StatementNode";
import { DataTypes } from "../../../Constants/Types";

export class DoNode extends StatementNode {
  Expression: ExpressionNode | null;
  Statement: StatementNode | null;

  constructor() {
    super();
    this.Expression = null;
    this.Statement = null;
  }

  Init(statement: StatementNode, expression: ExpressionNode) {
    this.Expression = expression;
    this.Statement = statement;

    if (expression.Type != DataTypes.Bool) {
      expression.Error("Do statement requires boolean");
    }
  }
}
