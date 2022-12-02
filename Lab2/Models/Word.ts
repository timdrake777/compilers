import { Token } from "./Token";

export class Word extends Token {
  Lexeme: string;

  constructor(lexeme: string, tag: number) {
    super(tag);
    this.Lexeme = lexeme;
  }

  ToString(): string {
    return this.Lexeme;
  }
}
