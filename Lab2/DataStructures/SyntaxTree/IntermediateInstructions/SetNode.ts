import { StatementNode } from "./StatementNode";
import { IdentifierNode } from "../IndermediateExpressions/IdentifierNode";
import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";
import { DataType } from "../../../Models/Type";
import { DataTypesRules } from "../../../Infrastructures/DataTypesRules";
import { DataTypes } from "../../../Constants/Types";

export class SetNode extends StatementNode {
  Identifier: IdentifierNode;
  Expression: ExpressionNode;

  constructor(identifier: IdentifierNode, expression: ExpressionNode) {
    super();
    this.Identifier = identifier;
    this.Expression = expression;

    if (this.Check(identifier.Type, expression.Type) == null) {
      Error("Type definition error");
    }
  }

  Check(dataType1: DataType | null, dataType2: DataType | null) {
    if (
      DataTypesRules.IsNumeric(dataType1) &&
      DataTypesRules.IsNumeric(dataType2)
    ) {
      return dataType2;
    }
    if (dataType1 == DataTypes.Bool && dataType2 == DataTypes.Bool) {
      return dataType2;
    }
    return null;
  }
}
