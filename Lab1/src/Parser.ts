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
      node = branches + "Declaration node:";
    }

    if (stringType === "3") {
      node = branches + "While node:";
      check = true;
    }

    if (stringType === "2" && stringValue === "7" && check) {
      node = branches + "While-operation node:";
      check = false;
    }

    if (stringWrite && stringWrite.includes("with value")) {
      stringWrite = stringWrite.replace("integer with value = ", "");
    }

    if (stringWrite && stringWrite.includes("variable <")) {
      stringWrite = stringWrite.replace("variable <", "");
      stringWrite = stringWrite.replace("of type <0>", "");
      stringWrite = stringWrite.replace(">", "");
    }

    if (stringType1 === "5") {
      node = branches + "Node: " + stringWrite1;
    }

    console.log(node);

    if (stringType !== "2" && stringType !== "5") {
      if (stringWrite) console.log(branches + stringWrite);
    }

    if (stringType === "2" && stringValue === "1") {
      if (i < size - 2) {
        console.log(branches + "-------------------");
      }
      branches += displacement;
    }

    node = "";
  }
}
