import { DataTypes } from "../../../Constants/Types";
import { Token } from "../../../Models/Token";
import { DataType } from "../../../Models/Type";
import { Num } from "../../../Models/Num";
import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";

export class ConstantNode extends ExpressionNode {
  constructor(
    token: Token | null,
    dataType: DataType | null,
    number: number | null
  ) {
    if (number && !token && !dataType) {
      super(new Num(number), DataTypes.Int);
    } else if (!number && token && dataType) {
      super(token, dataType);
    } else {
      console.error("Type Error: ConstantNode");
    }
  }
}
