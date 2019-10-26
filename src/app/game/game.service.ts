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
                [ArithmeticOperations.Multiplication, { leftOperandMin: 3, leftOperandMax: 6, rightOperandMin: 3, rightOperandMax: 6 }],
                [ArithmeticOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [ArithmeticOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ],
        [
            DifficultyLevels.Hard, new Map([
                [ArithmeticOperations.Multiplication, { leftOperandMin: 6, leftOperandMax: 11, rightOperandMin: 6, rightOperandMax: 11 }],
                [ArithmeticOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [ArithmeticOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ],
        [
            DifficultyLevels.Impossible, new Map([
                [ArithmeticOperations.Multiplication, { leftOperandMin: 8, leftOperandMax: 15, rightOperandMin: 8, rightOperandMax: 15 }],
                [ArithmeticOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [ArithmeticOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ]
    ]);

    getRandomQuestion(difficulty: DifficultyLevels, operation?: ArithmeticOperations) {
        const difficultyLevelConstraints = this.difficultyLevels.get(difficulty);
        const allowedOperations = Array.from(difficultyLevelConstraints.keys());
        const chosenOperation = operation ? operation : allowedOperations[Math.floor(Math.random() * allowedOperations.length)];
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
