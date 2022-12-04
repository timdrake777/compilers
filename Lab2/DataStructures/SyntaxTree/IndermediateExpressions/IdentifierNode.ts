import { DataType } from "../../../Models/Type";
import { Word } from "../../../Models/Word";
import { ExpressionNode } from "./ExpressionNode";

export class IdentifierNode extends ExpressionNode {
  Offset: number;

  constructor(id: Word, p: DataType, offset: number) {
    super(id, p);
    this.Offset = offset;
  }
}
