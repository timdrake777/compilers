import { DataTypesRules } from "../../../Infrastructures/DataTypesRules";
import { Token } from "../../../Models/Token";
import { ExpressionNode } from "./ExpressionNode";
import { OperationNode } from "./OperationNode";

export class ArithmeticNode extends OperationNode
	{
		Expression1: ExpressionNode
    Expression2: ExpressionNode

		constructor( token: Token,  expression1: ExpressionNode,  expression2: ExpressionNode)
		{
      super(token, null)
			this.Expression1 = expression1;
			this.Expression2 = expression2;

			this.Type = DataTypesRules.Maximize(expression1.Type, expression2.Type);
			if (this.Type == null)
			{
				this.Error("Type error");
			}
		}

		override Generate()
		{
			return new ArithmeticNode(this.Operation, this.Expression1, this.Expression2);
		}

		override ToString()
		{
			return `${this.Expression1} ${this.Operation} ${this.Expression2}`;
		}
	}