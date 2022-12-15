import { LexemProcessor } from "./Lexems";
import fs from "fs"
import Parser from "./Parser";
import Simantic from "./Simantic";
import Converter from "./Converter";

const result = LexemProcessor("./src/Examples/while.txt");

var temp = "";

for (let i = 0; i < result.lexems.length; i++) {
  
  if (i === result.lexems.length - 1) {
    temp += `${result.lexems[i].type};${
      result.lexems[i].lexem === ";" ? "semicolon" : result.lexems[i].lexem
    };${result.lexems[i].value};${result.lexems[i].line}`;
  } else {
    temp += `${result.lexems[i].type};${
      result.lexems[i].lexem === ";" ? "semicolon" : result.lexems[i].lexem
    };${result.lexems[i].value};${result.lexems[i].line}\n`;
  }
}
fs.writeFileSync("./src/Examples/answer.txt", temp);
console.log(result.variables);

Parser()
let err = Simantic(result.variables)
if (err !== "error") {
  Converter(result.variables)
}

