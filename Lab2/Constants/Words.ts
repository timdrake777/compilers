import { Word } from "../Models/Word";
import { Tags } from "./Tags";

interface Words {
  And: Word;
  Or: Word;
  Eq: Word;
  Ne: Word;
  Le: Word;
  Ge: Word;
  Minus: Word;
  True: Word;
  False: Word;
  Temp: Word;
}

export const Words: Words = {
  And: new Word("&&", Tags.And),
  Or: new Word("||", Tags.Or),
  Eq: new Word("==", Tags.Eq),
  Ne: new Word("!=", Tags.Ne),
  Le: new Word("<=", Tags.Le),
  Ge: new Word(">=", Tags.Ge),
  Minus: new Word("minus", Tags.Minus),
  True: new Word("true", Tags.True),
  False: new Word("false", Tags.False),
  Temp: new Word("t", Tags.Temp)
};
