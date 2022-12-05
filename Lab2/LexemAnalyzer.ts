import fs from "fs";

import { Word } from "./Models/Word";
import { Tags } from "./Constants/Tags";
import { DataTypes } from "./Constants/Types";
import { Words } from "./Constants/Words";
import { Token } from "./Models/Token";
import { Num } from "./Models/Num";
import { Real } from "./Models/Real";

interface Keywords {
  str: string;
  word: Word;
}

export class LexemAnalyzer {
  static Line: number = 1;
  Peek: string = " ";
  keywords: Keywords[] = [];
  FileContent: string;
  Pointer: number = 0;

  Reserve(word: Word) {
    let temp: Keywords = { str: word.Lexeme, word: word };
    this.keywords.push(temp);
  }

  constructor(filePath: string) {
    this.Reserve(new Word("if", Tags.If));
    this.Reserve(new Word("else", Tags.Else));
    this.Reserve(new Word("while", Tags.While));
    this.Reserve(new Word("do", Tags.Do));
    this.Reserve(new Word("break", Tags.Break));
    this.Reserve(Words.True);
    this.Reserve(Words.False);
    this.Reserve(DataTypes.Int);
    this.Reserve(DataTypes.Char);
    this.Reserve(DataTypes.Float);
    this.Reserve(DataTypes.Bool);
    this.FileContent = fs.readFileSync(filePath, "utf-8");
  }

  isDigit = (char: string) => {
    return /\d/.test(char);
  };

  isLetter = (char: string) => {
    return char.match(/[a-z]/i);
  };

  ReadChar(): void {
    if (this.Pointer == this.FileContent.length) {
      this.Peek = "\0";
    } else {
      this.Peek = this.FileContent[this.Pointer++];
    }
  }

  ReadCharSecond(c: string): boolean {
    this.ReadChar();
    if (this.Peek != c) {
      return false;
    }
    this.Peek = " ";
    return true;
  }

  ScanNext(): Token {
    for (; ; this.ReadChar()) {
      if (this.Peek == " " || this.Peek == "\t") {
        continue;
      } else if (this.Peek == "\0") {
        return new Token("\0");
      } else if (this.Peek == "\n") {
        LexemAnalyzer.Line = LexemAnalyzer.Line + 1;
      } else {
        break;
      }
    }

    switch (this.Peek) {
      case "&":
        if (this.ReadCharSecond("&")) {
          return Words.And;
        } else {
          return new Token("&");
        }
      case "|":
        if (this.ReadCharSecond("|")) {
          return Words.Or;
        } else {
          return new Token("|");
        }
      case "=":
        if (this.ReadCharSecond("=")) {
          return Words.Eq;
        } else {
          return new Token("=");
        }
      case "!":
        if (this.ReadCharSecond("=")) {
          return Words.Ne;
        } else {
          return new Token("!");
        }
      case "<":
        if (this.ReadCharSecond("=")) {
          return Words.Le;
        } else {
          return new Token("<");
        }
      case ">":
        if (this.ReadCharSecond("=")) {
          return Words.Ge;
        } else {
          return new Token(">");
        }
    }

    if (this.isDigit(this.Peek)) {
      let value: number = 0;
      do {
        value = 10 * value + Number.parseInt(this.Peek);
        this.ReadChar();
      } while (this.isDigit(this.Peek));

      if (this.Peek != ".") {
        return new Num(value);
      }

      let fValue: number = value;
      let d: number = 10;

      while (true) {
        this.ReadChar();
        if (!this.isDigit(this.Peek)) {
          break;
        }
        fValue = fValue + Number.parseInt(this.Peek) / d;
        d = d * 10;
      }

      return new Real(fValue);
    }

    if (this.isLetter(this.Peek)) {
      let buffer: string = "";
      do {
        buffer += this.Peek;
        this.ReadChar();
      } while (this.isDigit(this.Peek) || this.isLetter(this.Peek));

      let s: string = buffer;
      let isKeyword: boolean = !!this.keywords.find((item) => item.str === s);
      if (isKeyword) {
        return this.keywords[s];
      }

      let word: Word = new Word(s, Tags.Id);
      let temp: Keywords = { str: s, word: word };
      this.keywords.push(temp);
      return word;
    }

    let token: Token = new Token(this.Peek);
    this.Peek = " ";
    return token;
  }
}
