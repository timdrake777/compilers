import { DataType } from "../Models/Type";
import { Tags } from "./Tags";

interface DataTypes {
  Int: DataType;
  Float: DataType;
  Char: DataType;
  Bool: DataType;
  Array: DataType;
}

export const DataTypes: DataTypes = {
  Int: new DataType("int", Tags.Basic, 4),
  Float: new DataType("float", Tags.Basic, 8),
  Char: new DataType("char", Tags.Basic, 1),
  Bool: new DataType("bool", Tags.Basic, 1),
  Array: new DataType("arr", Tags.Basic, 1)
};
