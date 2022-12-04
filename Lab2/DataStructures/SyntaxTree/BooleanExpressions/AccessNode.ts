import { Tags } from "../../../Constants/Tags";
import { DataType } from "../../../Models/Type";
import { Word } from "../../../Models/Word";
import { ExpressionNode } from "../IndermediateExpressions/ExpressionNode";
import { IdentifierNode } from "../IndermediateExpressions/IdentifierNode";
import { OperationNode } from "../IndermediateExpressions/OperationNode";

export class AccessNode extends OperationNode {
  Array: IdentifierNode;
  Index: ExpressionNode;

  constructor(
    array: IdentifierNode,
    index: ExpressionNode,
    type: DataType | null
  ) {
    super(new Word("[]", Tags.Index), type);
    this.Array = array;
    this.Index = index;
  }

  override Generate(): ExpressionNode {
    return new AccessNode(this.Array, this.Index.Reduce(), this.Type);
  }
}
