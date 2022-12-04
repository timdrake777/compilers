import { StatementNode } from "./StatementNode";

export class SequenceNode extends StatementNode {
  Statement1: StatementNode;
  Statement2: StatementNode;

  constructor(statement1: StatementNode, statement2: StatementNode) {
    super();
    this.Statement1 = statement1;
    this.Statement2 = statement2;
  }
}
