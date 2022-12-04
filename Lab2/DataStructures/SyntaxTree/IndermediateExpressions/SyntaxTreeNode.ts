export class SyntaxTreeNode {
  LexLine: number = 0;
  constructor() {}

  Error(s: string) {
    throw console.error(`Error around ${this.LexLine}: s`);
  }
}
