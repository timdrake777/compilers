import { Tags } from "../../../Constants/Tags";
import { DataTypes } from "../../../Constants/Types";
import { Token } from "../../../Models/Token";
import { DataType } from "../../../Models/Type";
import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";
import { LogicalNode } from "./LogicalNode";

export class RelativeNode extends LogicalNode {
  constructor(
    token: Token,
    expression1: ExpressionNode,
    expression2: ExpressionNode
  ) {
    super(token, expression1, expression2);
  }

  override Check(type1: DataType, type2: DataType) {
    if (type1.Tag == Tags.Index || type2.Tag == Tags.Index) {
      return null;
    }

    if (type1 == type2) {
      return DataTypes.Bool;
    }

    return null;
  }
}
