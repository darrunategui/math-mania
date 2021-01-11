import { MathOperations } from './math-operations.enum';

export class MathQuestion {
  leftOperand: number;
  rightOperand: number;
  operation: MathOperations;

  get answer() {
    switch (this.operation) {
      case MathOperations.Multiplication: return this.leftOperand * this.rightOperand;
      case MathOperations.Addition: return this.leftOperand + this.rightOperand;
      case MathOperations.Subtraction: return this.leftOperand - this.rightOperand;
      default: return null;
    }
  }

  constructor(left: number, right: number, op: MathOperations) {
    this.leftOperand = left;
    this.rightOperand = right;
    this.operation = op;
  }
}
