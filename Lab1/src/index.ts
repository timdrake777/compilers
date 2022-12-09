import { LexemProcessor } from "./Lexems";
import fs from "fs"
import Parser from "./Parser";
import Simantic from "./Simantic";

const result = LexemProcessor("./src/Examples/while.txt");
console.log(result.variables);

var temp = "";

for (let i = 0; i < result.lexems.length; i++) {
  temp += `${result.lexems[i].type};${
    result.lexems[i].lexem === ";" ? "semicolon" : result.lexems[i].lexem
  };${result.lexems[i].value}\n`;
}
fs.writeFileSync("./src/Examples/answer.txt", temp);
// Parser()
Simantic(result.variables)
