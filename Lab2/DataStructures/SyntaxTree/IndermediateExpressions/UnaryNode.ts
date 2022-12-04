import { DataTypes } from "../../../Constants/Types";
import { DataTypesRules } from "../../../Infrastructures/DataTypesRules";
import { Token } from "../../../Models/Token";
import { ExpressionNode } from "./ExpressionNode";
import { OperationNode } from "./OperationNode";

export class UnaryNode extends OperationNode {
  Expression: ExpressionNode;

  constructor(token: Token, expression: ExpressionNode) {
    super(token, null);
    this.Expression = expression;
    this.Type = DataTypesRules.Maximize(DataTypes.Int, expression.Type);

    if (this.Type === null) {
      console.error("Type error");
    }
  }

  override Generate(): ExpressionNode {
    return new UnaryNode(this.Operation, this.Expression.Reduce());
  }

  override ToString() {
    return `${this.Operation} ${this.Expression}`;
  }
}
