import { Injectable } from '@angular/core';
import { ArithmeticOperations, DifficultyLevelConstraint, DifficultyLevels, MathQuestion } from '../model';

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

    getRandomQuestion(difficulty: DifficultyLevels, operation?: ArithmeticOperations) {
        const difficultyLevelConstraints = this.difficultyLevels.get(difficulty);
        const allowedOperations = difficultyLevelConstraints.keys;
        const chosenOperation = operation != null ? operation : allowedOperations[Math.floor(Math.random() * allowedOperations.length)];
        const constraint = difficultyLevelConstraints.get(chosenOperation);

        let question = new MathQuestion();
        question.leftOperand = this.getRandomNumber(constraint.leftOperandMin, constraint.leftOperandMax);
        question.rightOperand = this.getRandomNumber(constraint.rightOperandMin, constraint.rightOperandMax);
        question.operation = chosenOperation;
        return question;
    }
    private getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;        
    }
}