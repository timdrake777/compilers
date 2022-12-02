import { Word } from "./Word";

export class DataType extends Word {
  Width: number;

  constructor(lexeme: string, tag: number, width: number) {
    super(lexeme, tag);
    this.Width = width;
  }
}
