import { SyntaxTreeNode } from "../IndermediateExpressions/SyntaxTreeNode";

export class StatementNode extends SyntaxTreeNode {
  constructor() {
    super();
  }

  static Null: StatementNode = new StatementNode();

  Generate(a: number, b: number) {}

  After: number = 0;

  static Enclosing: StatementNode = StatementNode.Null;
}
