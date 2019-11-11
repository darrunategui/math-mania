import { createAction, props } from '@ngrx/store';
import { DifficultyLevels, MathQuestion } from 'src/app/model';

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

export const answerQuestionSuccess = createAction(
  '[Game] Answer Question Success',
  props<{ questionsLeft: MathQuestion[], nextQuestion: MathQuestion }>()
);

export const answerQuestionFail = createAction(
  '[Game] Answer Question Fail'
);

export const endGameSuccess = createAction(
  '[Game] End Game Success'
);