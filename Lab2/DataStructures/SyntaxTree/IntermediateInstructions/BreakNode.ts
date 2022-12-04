import { StatementNode } from "./StatementNode";

export class BreakNode extends StatementNode {
  Statement: StatementNode;

  constructor() {
    super();
    if (StatementNode.Enclosing == null) {
      console.error("Unenclosed break");
    }
    this.Statement = StatementNode.Enclosing;
  }
}
