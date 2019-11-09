import { createAction, props } from '@ngrx/store';
import { DifficultyLevels, MathQuestion } from 'src/app/model';

export const setDifficulty = createAction('[Game] Select Difficulty', props<{ 
  difficulty: DifficultyLevels 
}>());

export const startGame = createAction('[Game] Start Game');

export const answerQuestion = createAction('[Game] Answer Question', props<{ 
  answer: number 
}>());

export const answerQuestionSuccess = createAction('[Game] Answer Question Success', props<{
  questionsLeft: MathQuestion[],
  currentQuestion: MathQuestion
}>());