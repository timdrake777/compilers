import { Token } from "../../Models/Token";
import { IdentifierNode } from "../SyntaxTree/IndermediateExpressions/IdentifierNode";

interface Table {
  Token: Token;
  identifier: IdentifierNode;
}

export class IdentifiersTable {
  _table: Table[];
  _previous: IdentifiersTable;

  constructor(prev: IdentifiersTable) {
    this._table = [];
    this._previous = prev;
  }

  Put(token: Token, identifier: IdentifierNode) {
    let temp: Table = { Token: token, identifier: identifier };
    this._table.push(temp);
  }

  Get(token: Token) {
    for (let t: IdentifiersTable = this; t != null; t = t._previous) {
      if (t._table.find((item) => item.Token === token)) {
        return t._table.find((item) => item.Token === token);
      }
    }

    return null;
  }
}
