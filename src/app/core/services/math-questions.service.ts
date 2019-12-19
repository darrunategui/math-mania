import { Injectable } from '@angular/core';
import { MathOperations, DifficultyLevelConstraint, DifficultyLevels, MathQuestion } from '../../model';

@Injectable({
    providedIn: 'root'
})
export class MathQuestionsService {

    private readonly difficultyLevels = new Map<DifficultyLevels, Map<MathOperations, DifficultyLevelConstraint>>([
        [
            DifficultyLevels.Easy, new Map([
                [MathOperations.Multiplication, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
                [MathOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [MathOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ],
        [
            DifficultyLevels.Medium, new Map([
                [MathOperations.Multiplication, { leftOperandMin: 3, leftOperandMax: 6, rightOperandMin: 3, rightOperandMax: 6 }],
                [MathOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [MathOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ],
        [
            DifficultyLevels.Hard, new Map([
                [MathOperations.Multiplication, { leftOperandMin: 6, leftOperandMax: 11, rightOperandMin: 6, rightOperandMax: 11 }],
                [MathOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [MathOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ],
        [
            DifficultyLevels.Impossible, new Map([
                [MathOperations.Multiplication, { leftOperandMin: 8, leftOperandMax: 15, rightOperandMin: 8, rightOperandMax: 15 }],
                [MathOperations.Subtraction, { leftOperandMin: 4, leftOperandMax: 8, rightOperandMin: 1, rightOperandMax: 5 }],
                [MathOperations.Addition, { leftOperandMin: 1, leftOperandMax: 4, rightOperandMin: 1, rightOperandMax: 4 }],
            ])
        ]
    ]);

    getRandomQuestion(difficulty: DifficultyLevels, operation?: MathOperations) {
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
