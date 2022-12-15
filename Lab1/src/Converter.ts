import fs from "fs";
import { Operations, Types } from "./ConstantTypes";
import { IVariablesArray } from "./Lexems/LexemProcessor";

export default function Converter(variables: IVariablesArray[]) {
  var text = fs.readFileSync("./src/Examples/answer2.txt", "utf-8");

  var lines = text.split("\n");

  var state = null;
  var text = "";
  let line2 = "";
  let line3 = "";
  let line4 = "";
  var branches = "";

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (i < lines.length - 2) {
      line2 = lines[i + 1];
      if (i < lines.length - 3) {
        line3 = lines[i + 2];
      }
      if (i < lines.length - 4) {
        line4 = lines[i + 3];
      }
    }
    if (line === "Declaration node:") {
      if (state !== null) {
        if (state === "whileOperation") {
          text += "\n}\n";
          branches = branches.slice(0, -1);
        } else {
          text += "\n";
        }
      }
      state = "declarate";
      continue;
    } else if (line === "While node:") {
      if (state !== null) {
        text += "\n";
      }
      branches += "\t";
      state = "while";
      continue;
    } else if (line === "While-operation node:") {
      if (state === "while") {
        text += ") {\n";
      } else if (state !== null) {
        text += "\n";
      }
      state = "whileOperation";
      continue;
    } else if (line === "Operation node:") {
      if (state !== null) {
        if (state === "whileOperation") {
          text += "\n}\n";
          branches = branches.slice(0, -1);
        } else {
          text += "\n";
        }
      }
      state = "operation";
      continue;
    }
    if (state === "declarate") {
      let type = "";
      if (Types.find((item) => item.attributes.comment === line)) {
        text += "var ";
      }
      if (line.includes("Node: ")) {
        line = line.replace("Node: ", "");
        let operationNode = Operations.find((item) => item.attributes.comment === line);
        if (operationNode) {
          text += line2 + " ";
          let foundVar = variables.find((item) => item.name == line2);
          if (foundVar && foundVar.dataType === "string of chars") {
            type = "string";
          }
          text += operationNode.type + " ";
          if (!line3.includes("Node: ")) {
            if (type === "string" && !variables.find((item) => item.name === line3)) {
              text += `"${line3}"`;
            } else {
              text += line3;
            }
            i += 2;
          } else {
            line3 = line3.replace("Node: ", "");
            text +=
              Operations.find((item) => item.attributes.comment === line3)?.type + lines[i + 3];
            i += 3;
          }
        }
      }
    } else if (state === "while") {
      if (line === "while") {
        text += "while (";
      }
      if (line.includes("Node: ")) {
        line = line.replace("Node: ", "");
        let operationNode = Operations.find((item) => item.attributes.comment === line);
        if (operationNode) {
          text += line2 + " ";
          text += operationNode.type + " ";
          if (!line3.includes("Node: ")) {
            text += line3;
            i += 2;
          } else {
            line3 = line3.replace("Node: ", "");
            text +=
              Operations.find((item) => item.attributes.comment === line3)?.type + lines[i + 3];
            i += 3;
          }
        }
      }
    } else if (state === "operation") {
      let type = "";
      if (line.includes("Node: ")) {
        line = line.replace("Node: ", "");
        let operationNode = Operations.find((item) => item.attributes.comment === line);
        if (operationNode) {
          text += line2 + " ";
          let foundVar = variables.find((item) => item.name === line2);
          if (foundVar && foundVar.dataType === "string of chars") {
            type = "string";
          }
          text += operationNode.type + " ";
          if (line3.includes("Node: ")) {
            line3 = line3.replace("Node: ", "");
            operationNode = Operations.find((item) => item.attributes.comment === line3)
            if (operationNode) {
              if (type === "string" && !variables.find((item) => item.name === line4)) {
                text += `"${line4}" `;
              } else {
                text += line4 + " ";
              }
              text += operationNode.type + " ";
              if (type === "string" && !variables.find((item) => item.name === lines[i+4])) {
                text += `"${lines[i+4]}"`;
              } else {
                text += lines[i+4];
              }
            }
            
            i += 4;
          }
        }
      }
    } else if (state === "whileOperation") {
      let type = "";
      text += branches;
      if (line.includes("Node: ")) {
        line = line.replace("Node: ", "");
        let operationNode = Operations.find((item) => item.attributes.comment === line);
        if (operationNode) {
          text += line2 + " ";
          let foundVar = variables.find((item) => item.name === line2);
          if (foundVar && foundVar.dataType === "string of chars") {
            type = "string";
          }
          text += operationNode.type + " ";
          if (line3.includes("Node: ")) {
            line3 = line3.replace("Node: ", "");
            operationNode = Operations.find((item) => item.attributes.comment === line3)
            if (operationNode) {
              if (type === "string" && !variables.find((item) => item.name === line4)) {
                text += `"${line4}" `;
              } else {
                text += line4 + " ";
              }
              text += operationNode.type + " ";
              if (type === "string" && !variables.find((item) => item.name === lines[i+4])) {
                text += `"${lines[i+4]}"`;
              } else {
                text += lines[i+4];
              }
            }
            
            i += 4;
          }
        }
      }
    }
  } 
  fs.writeFileSync("./src/Examples/output.txt", text);
}
