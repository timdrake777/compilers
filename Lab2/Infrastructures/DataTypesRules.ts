import { DataType } from "../Models/Type";
import { DataTypes } from "../Constants/Types";

export class DataTypesRules {
  static IsNumeric(p: DataType | null) {
    return p == DataTypes.Char || p == DataTypes.Int || p == DataTypes.Float;
  }

  static Maximize(p1: DataType | null, p2: DataType | null): DataType | null {
    if (!this.IsNumeric(p1) || !this.IsNumeric(p2)) {
      return null;
    } else if (p1 == DataTypes.Float || p2 == DataTypes.Float) {
      return DataTypes.Float;
    } else if (p1 == DataTypes.Int || p2 == DataTypes.Int) {
      return DataTypes.Int;
    } else {
      return DataTypes.Char;
    }
  }
}
