import { createAction, props } from '@ngrx/store';
import { DifficultyLevels, MathQuestion, GameStatus } from '@mathmania/model';

export const setDifficulty = createAction(
  '[Game] Set Difficulty',
  props<{ difficulty: DifficultyLevels }>()
);

export const setEllapsedTime = createAction(
  '[Game] Set Ellapsed Time',
  props<{ ellapsedTime: number }>()
);

export const startGame = createAction(
  '[Game] Start Game'
);

export const answerQuestion = createAction(
  '[Game] Answer Question',
  props<{ answer: number }>()
);

export const setStatus = createAction(
  '[Game] Set Status',
  props<{ status: GameStatus }>()
);

export const setQuestions = createAction(
  '[Game] Set Questions',
  props<{ questionsLeft: MathQuestion[], nextQuestion: MathQuestion }>()
);

export const endGame = createAction(
  '[Game] End Game'
);

export const resetGame = createAction(
  '[Game] Reset Game'
);
