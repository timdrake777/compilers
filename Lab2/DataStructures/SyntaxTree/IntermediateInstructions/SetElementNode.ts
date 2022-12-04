import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";
import { IdentifierNode } from "../IndermediateExpressions/IdentifierNode";
import { AccessNode } from "../BooleanExpressions/AccessNode";
import { StatementNode } from "./StatementNode";
import { DataType } from "../../../Models/Type";

export class SetElementNode extends StatementNode {
  Array: IdentifierNode;
  Index: ExpressionNode;
  Expression: ExpressionNode;

  constructor(accessNode: AccessNode, expressionNode: ExpressionNode) {
    super();
    this.Array = accessNode.Array;
    this.Index = accessNode.Index;
    this.Expression = expressionNode;

    if (this.Check(this.Expression.Type, accessNode.Type) == null) {
      console.error("Type definition error");
    }
  }

  Check(dataType1: DataType | null, dataType2: DataType | null) {
    if (dataType1 == dataType2) {
      return dataType2;
    }

    return null;
  }
}
