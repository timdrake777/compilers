import { LexemAnalyzer } from "./LexemAnalyzer";
import { Token } from "./Models/Token";
import { IdentifiersTable } from "./DataStructures/IdentifiersTable/IdentifiersTable";
import { StatementNode } from "./DataStructures/SyntaxTree/IntermediateInstructions/StatementNode";
import { Tags } from "./Constants/Tags";
import { DataType } from "./Models/Type";
import { IdentifierNode } from "./DataStructures/SyntaxTree/IndermediateExpressions/IdentifierNode";

export class Parser
	{
		private Analyzer: LexemAnalyzer;
		private Lookahead: Token;
		top: IdentifiersTable | null = null;

		constructor(analyzer: LexemAnalyzer)
		{
			this.Analyzer = analyzer;
			this.Move();
		}

		Program(): StatementNode
		{
			let statementNode: StatementNode = this.Block();
			console.log(statementNode);
			return statementNode;
		}

		Move()
		{
			this.Lookahead = this.Analyzer.ScanNext();
			if (this.Lookahead.Tag == '\0')
			{
				return;
			}
		}

		Error(s: string)
		{
			throw console.error(`Error in line ${LexemAnalyzer.Line} ${s}`);
		}

		Match(t: number | string)
		{
			if (this.Lookahead.Tag == t)
			{
				this.Move();
			}
			else
			{
				this.Error("Syntax error");
			}
		}

		Block(): StatementNode
		{
			this.Match('{');
			let table: IdentifiersTable | null = this.top;
			this.top = new IdentifiersTable(this.top as IdentifiersTable);
			this.Declare();
			let node: StatementNode = this.Statements();
			this.Match('}');
			this.top = table;
			return node;
		}

		Declare()
		{
			while (this.Lookahead.Tag == Tags.Basic)
			{
				let type: DataType = this.Type();
				let token: Token = this.Lookahead;
				this.Match(Tags.Id);
				this.Match(';');
				let node: IdentifierNode = new IdentifierNode((Word)token, type, 0);
				top.Put(token, node);
			}
		}

		private DataType Type()
		{
			DataType type = (DataType)Lookahead;
			Match(Tags.Basic);
			if (Lookahead.Tag != '[')
			{
				return type;
			}
			else
			{
				Error("Arrays are not supported yet");
				return null;
			}
		}

		private StatementNode Statements()
		{
			if (Lookahead.Tag == '}')
			{
				return StatementNode.Null;
			}
			else
			{
				return new SequenceNode(Statement(), Statements());
			}
		}

		private StatementNode Statement()
		{
			ExpressionNode expression;
			StatementNode statement,
				statement1,
				statement2,
				savedStatement;

			switch(Lookahead.Tag)
			{
				case ':':
					Move();
					return StatementNode.Null;
				case  Tags.If:
					Match(Tags.If);
					Match('(');
					expression = Bool();
					Match(')');
					statement1 = Statement();
					if (Lookahead.Tag !=  Tags.Else)
					{
						return new IfNode(expression, statement1);
					}
					Match(Tags.Else);
					statement2 = Statement();
					return new ElseNode(expression, statement1, statement2);
				case Tags.While:
					WhileNode whileNode = new WhileNode();
					savedStatement = StatementNode.Enclosing;
					StatementNode.Enclosing = whileNode;
					Match(Tags.While);
					Match('(');
					expression = Bool();
					Match(')');
					statement1 = Statement();
					whileNode.Init(expression, statement1);
					StatementNode.Enclosing = savedStatement;
					return whileNode;
				case Tags.Do:
					DoNode doNode = new DoNode();
					savedStatement = StatementNode.Enclosing;
					StatementNode.Enclosing = doNode;
					Match(Tags.Do);
					statement1 = Statement();
					Match(Tags.While);
					Match('(');
					expression = Bool();
					Match(')');
					Match(';');
					doNode.Init(statement1, expression);
					StatementNode.Enclosing = savedStatement;
					return doNode;
				case Tags.Break:
					Match(Tags.Break);
					Match(';');
					return new BreakNode();
				case '{':
					return Block();
				default:
					return Assign();
			}
		}

		private StatementNode Assign()
		{
			StatementNode statement;
			Token token = Lookahead;
			Match(Tags.Id);
			IdentifierNode identifier = top.Get(token);
			if (identifier == null)
			{
				Error($"Use of undeclared variable {token.ToString()}");
			}
			if (Lookahead.Tag == '=')
			{
				Move();
				statement = new SetNode(identifier, Bool());
			}
			else
			{
				AccessNode accessNode = Offset(identifier);
				Match('=');
				statement = new SetElementNode(accessNode, Bool());
			}
			Match(';');
			return statement;
		}

		private ExpressionNode Bool()
		{
			ExpressionNode expression = Join();
			while (Lookahead.Tag == Tags.Or)
			{
				Token token = Lookahead;
				Move();
				expression = new OrNode(token, expression, Join());
			}
			return expression;
		}

		private ExpressionNode Join()
		{
			ExpressionNode expression = Equality();
			while (Lookahead.Tag == Tags.And)
			{
				Token token = Lookahead;
				Move();
				expression = new AndNode(token, expression, Equality());
			}
			return expression;
		}

		private ExpressionNode Equality()
		{
			ExpressionNode expression = Relative();
			while (Lookahead.Tag == Tags.Eq || Lookahead.Tag == Tags.Ne)
			{
				Token token = Lookahead;
				Move();
				expression = new RelativeNode(token, expression, Relative());
			}
			return expression;
		}

		private ExpressionNode Relative()
		{
			ExpressionNode expression = Expression();
			switch (Lookahead.Tag)
			{
				case '<':
				case Tags.Le:
				case Tags.Ge:
				case '>':
					Token token = Lookahead;
					Move();
					return new RelativeNode(token, expression, Expression());
				default:
					return expression;
			}
		}

		private ExpressionNode Expression()
		{
			ExpressionNode expression = Term();
			while (Lookahead.Tag == '+'
				|| Lookahead.Tag == '-')
			{
				Token token = Lookahead;
				Move();
				expression = new ArithmeticNode(token, expression, Term());
			}
			return expression;
		}

		private ExpressionNode Term()
		{
			ExpressionNode expression = Unary();
			while (Lookahead.Tag == '*'
				|| Lookahead.Tag == '/')
			{
				Token token = Lookahead;
				Move();
				expression = new ArithmeticNode(token, expression, Unary());
			}
			return expression;
		}

		private ExpressionNode Unary()
		{
			if (Lookahead.Tag == '-')
			{
				Move();
				return new UnaryNode(Words.Minus, Unary());
			}
			else if (Lookahead.Tag == '!')
			{
				Token token = Lookahead;
				Move();
				return new NotNode(token, Unary());
			}
			else
			{
				return Factor();
			}
		}

		private ExpressionNode Factor()
		{
			ExpressionNode expressionNode = null;

			switch (Lookahead.Tag)
			{
				case '(':
					Move();
					expressionNode = Bool();
					Match(')');
					return expressionNode;
				case Tags.Num:
					expressionNode = new ConstantNode(Lookahead, DataTypes.Int);
					Move();
					return expressionNode;
				case Tags.Real:
					expressionNode = new ConstantNode(Lookahead, DataTypes.Float);
					Move();
					return expressionNode;
				case Tags.True:
					expressionNode = Constants.Constants.True;
					Move();
					return expressionNode;
				case Tags.False:
					expressionNode = Constants.Constants.False;
					Move();
					return expressionNode;
				case Tags.Id:
					string s = Lookahead.ToString();
					IdentifierNode identifier = top.Get(Lookahead);
					if (identifier == null)
					{
						Error($"Use of undeclared variable {Lookahead}");
					}
					Move();
					if (Lookahead.Tag != '[')
					{
						return identifier;
					}
					else
					{
						return Offset(identifier);
					}
				default:
					Error("Syntax error");
					return expressionNode;
			}
		}

		private AccessNode Offset(IdentifierNode identifier)
		{
			ExpressionNode i,
				value, term1, term2, loc;

			DataType type = identifier.Type;

			Match('[');
			i = Bool();
			Match(']');

			type = DataTypes.Array;
			value = new ConstantNode(0);
			term1 = new ArithmeticNode(new Token('*'), i, value);
			loc = term1;

			while (Lookahead.Tag == '[')
			{
				Match('[');
				i = Bool();
				Match(']');
				type = DataTypes.Array;
				value = new ConstantNode(0);
				term1 = new ArithmeticNode(new Token('*'), i, value);
				term2 = new ArithmeticNode(new Token('+'), loc, term1);
				loc = term2;
			}

			return new AccessNode(identifier, loc, type);
		} 
	}