import fs from "fs";

export default function Parser() {
  var text = fs.readFileSync("./src/Examples/answer.txt", "utf-8");
  var words = text.split("\n");

  var size = words.length;
  var stringValue = "";
  var stringWrite = "";
  var stringType = "";
  var stringWrite1 = "";
  var stringValue1 = "";
  var stringType1 = "";

  var displacement = "\t\t\t";
  var branches = "";
  var node = "";
  var text = "";
  var operation = false;

  var check = false;
  for (let i = 0; i < size; i++) {
    if (!words[i].length) break;
    let lexem_parts = words[i].split(";");
    stringType = lexem_parts[0];
    stringWrite = lexem_parts[1];
    stringValue = lexem_parts[2];
    if (i < size - 1) {
      let lexem_parts1 = words[i + 1].split(";");
      stringType1 = lexem_parts1[0];
      stringWrite1 = lexem_parts1[1];
      stringValue1 = lexem_parts1[2];
    }

    if (stringType === "0") {
      node = "Declaration node:";
    }

    if (stringType === "3") {
      node = "While node:";
      check = true;
    }

    if (
      ((stringType === "2" && stringValue === "7") ||
        stringType === "0" ||
        stringType === "1") &&
      check
    ) {
      node = "While-operation node:";
    }

    if (stringType === "2" && stringValue === "8" && check) {
      check = false;
    }

    if (
      stringWrite1.includes("variable <") &&
      !stringWrite1.includes("of type") &&
      !check &&
      !operation
    ) {
      node = "Operation node:";
      operation = true;
    }

    if (stringWrite && stringWrite.includes("with value")) {
      
      if (stringWrite.replace("integer with value = ", "") === stringWrite) {
        stringWrite = stringWrite.replace("string with value = ", "")
      } else {
        stringWrite = stringWrite.replace("integer with value = ", "");
      }
    }

    if (stringWrite && stringWrite.includes("variable <")) {
      stringWrite = stringWrite.replace("variable <", "");
      stringWrite = stringWrite.replace(" of type <0>", "");
      stringWrite = stringWrite.replace(">", "");
    }

    if (stringType1 === "5") {
      node = "Node: " + stringWrite1;
    }
    if (node) {
      text += node + "\n";
    }

    if (stringType !== "2" && stringType !== "5") {
      if (stringWrite) text += stringWrite + "\n";
    }

    if (stringType === "2" && stringValue === "1") {
      if (i < size - 2) {
        // console.log(branches + "-------------------");
      }
      branches += displacement;
    }

    if (stringType1 === "2" && stringValue1 === "1") {
      operation = false;
    }

    node = "";
  }
  fs.writeFileSync("./src/Examples/answer2.txt", text);
}
