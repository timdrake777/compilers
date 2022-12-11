import fs from "fs";
import { IVariablesArray } from "./Lexems/LexemProcessor";

export default function Simantic(variables: IVariablesArray[]) {
  var text = fs.readFileSync("./src/Examples/answer.txt", "utf-8");
  var lines = text.split("\n");
  var lastType: IVariablesArray | null = null;
  var err = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split(";");

    let type = line[0];
    let varValue = Number.parseInt(line[2]) || line[2];
    if (type === "1") {
      let foundVar: IVariablesArray | undefined = variables.find(
        (item) => item.id === varValue
      );
      if (!foundVar) {
        console.log(`Error: var is not declaration at ${line[3]} line`);
        err = true;
        break;
      }
      if (lastType) {
        if (
          varValue < 4 &&
          (lastType.dataType === "32-bit integer" ||
            lastType.dataType === "32-bit unsigned integer" ||
            lastType.dataType === "64-bit integer" ||
            lastType.dataType === "64-bit unsigned integer")
        ) {
          lastType = null;
        } else if (varValue === 4 && lastType.dataType === "string of chars") {
          lastType = null;
        } else {
          console.log(`Error: Illegal types at ${line[3]} line`);
          err = true;
          break;
        }
      }
      if (!lastType) {
        lastType = foundVar;
      }
      continue;
    }
    if (type === "2" && varValue !== 9) {
      lastType = null;
      continue;
    }
    if (type === "5") {
      if (lastType?.dataType === "string of chars" && varValue > 1) {
        console.log(`Error: Illegal types at ${line[3]} line`);
        err = true;
        break;
      }
      continue;
    }
    if (type === "4") {      
      if (lastType) {
        if (
          (lastType.dataType === "32-bit integer" ||
            lastType.dataType === "32-bit unsigned integer" ||
            lastType.dataType === "64-bit integer" ||
            lastType.dataType === "64-bit unsigned integer") &&
          Number.parseInt(varValue as string)
        ) {
          continue;
        } else if (lastType.dataType === "string of chars" && !Number.parseInt(varValue as string)) {
          continue;
        } else {
          console.log(`Error: Illegal types at ${line[3]} line`);
          err = true;
          break;
        }
      } else {
        console.log(`Error: Illegal types at ${line[3]} line`);
        err = true;
        break;
      }
    }
  }
  if (!err) console.log(1);
}
