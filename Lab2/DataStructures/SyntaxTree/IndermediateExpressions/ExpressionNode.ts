import { Token } from "../../../Models/Token";
import { DataType } from "../../../Models/Type";
import { SyntaxTreeNode } from "./SyntaxTreeNode";

export class ExpressionNode extends SyntaxTreeNode {
  Operation: Token;
  Type: DataType | null;
  constructor(operation: Token, type: DataType | null) {
    super()
    this.Operation = operation;
    this.Type = type;
  }

  Generate(): any {
    return this
  }

  Reduce(): any {
    return this
  }

  ToString() {
    return this.Operation.ToString();
  }
}