import { ArithmeticOperations } from './arithmetic-operations.enum';

export class MathQuestion {
    leftOperand: number;
    rightOperand: number;
    operation: ArithmeticOperations;
    
    get answer() {
        switch(this.operation) {
            case ArithmeticOperations.Multiplication: return this.leftOperand * this.rightOperand;
            case ArithmeticOperations.Addition: return this.leftOperand + this.rightOperand;
            case ArithmeticOperations.Subtraction: return this.leftOperand - this.rightOperand;
            default: return null;
        }
    }
}