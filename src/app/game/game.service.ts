import { Injectable } from '@angular/core';
import { DifficultyLevels, ArithmeticOperations, DifficultyLevelConstraint } from '../model';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private readonly difficultyLevels = new Map<DifficultyLevels, Map<ArithmeticOperations, DifficultyLevelConstraint>>([
        [
            DifficultyLevels.Easy, new Map([
                [ArithmeticOperations.Multiplication, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
                [ArithmeticOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [ArithmeticOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ],
        [
            DifficultyLevels.Medium, new Map([
                [ArithmeticOperations.Multiplication, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
                [ArithmeticOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [ArithmeticOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ],
        [
            DifficultyLevels.Hard, new Map([
                [ArithmeticOperations.Multiplication, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
                [ArithmeticOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [ArithmeticOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ],
        [
            DifficultyLevels.Impossible, new Map([
                [ArithmeticOperations.Multiplication, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
                [ArithmeticOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [ArithmeticOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ]
    ]);

    //private readonly operations = Object.values(ArithmeticOperations) as ArithmeticOperations[];

    getRandomLeftOperand(difficulty: DifficultyLevels, operation?: ArithmeticOperations) {
        const data = this.getConstraint(difficulty, operation);
        return this.getRandomNumber(data.leftOperandMin, data.leftOperandMax);
    }

    getRandomRightOperand(difficulty: DifficultyLevels, operation?: ArithmeticOperations) {
        const data = this.getConstraint(difficulty, operation);
        return this.getRandomNumber(data.rightOperandMin, data.rightOperandMax);
    }

    private getConstraint(difficulty: DifficultyLevels, operation?: ArithmeticOperations) {
        const operations = this.difficultyLevels.get(difficulty);
        const allowedOperations = operations.keys;
        return operations.get(operation != null ? operation : allowedOperations[Math.floor(Math.random() * allowedOperations.length)]);
    }
    private getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;        
    }
}