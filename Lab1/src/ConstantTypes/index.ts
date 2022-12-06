export interface IType {
  readonly type: string;
  readonly attributes: {
    id: number;
    comment: string;
  };
}

export const Types: IType[] = [
  {
    type: "int",
    attributes: {
      id: 0,
      comment: "32-bit integer",
    },
  },
  {
    type: "uint",
    attributes: {
      id: 1,
      comment: "32-bit unsigned integer",
    },
  },
  {
    type: "long",
    attributes: {
      id: 2,
      comment: "64-bit integer",
    },
  },
  {
    type: "ulong",
    attributes: {
      id: 3,
      comment: "64-bit unsigned integer",
    },
  },
  {
    type: "string",
    attributes: {
      id: 4,
      comment: "string of chars",
    },
  },
];

export const Operations: IType[] = [
  {
    type: "=",
    attributes: {
      id: 0,
      comment: "assign_operation",
    },
  },
  {
    type: "+",
    attributes: {
      id: 1,
      comment: "sum_operation",
    },
  },
  {
    type: "-",
    attributes: {
      id: 2,
      comment: "subtract_operation",
    },
  },
  {
    type: "*",
    attributes: {
      id: 3,
      comment: "multiply_operation",
    },
  },
  {
    type: "/",
    attributes: {
      id: 4,
      comment: "divide_operation",
    },
  },
  {
    type: "+=",
    attributes: {
      id: 5,
      comment: "add_amount_operation",
    },
  },
  {
    type: "-=",
    attributes: {
      id: 6,
      comment: "subtract_amount_operation",
    },
  },
  {
    type: "==",
    attributes: {
      id: 7,
      comment: "are_equal_operation",
    },
  },
  {
    type: ">",
    attributes: {
      id: 8,
      comment: "more_operation",
    },
  },
  {
    type: "<",
    attributes: {
      id: 9,
      comment: "less_operation",
    },
  },
  {
    type: "++",
    attributes: {
      id: 10,
      comment: "increment_operation",
    },
  },
  {
    type: "--",
    attributes: {
      id: 11,
      comment: "decrement_operation",
    },
  },
  {
    type: "%",
    attributes: {
      id: 12,
      comment: "modulo_operation",
    },
  },
];

export const Keywords: string[] = [
  "class",
  "public",
  "private",
  "for",
  "return",
  "if",
  "else",
  "while",
];

export const KeySymbols: string[] = [
  ".",
  ";",
  ",",
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
];
