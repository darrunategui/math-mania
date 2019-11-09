import { createAction, props } from '@ngrx/store';
import { DifficultyLevels } from 'src/app/model';

export const selectDifficulty = createAction('[Game] Select Difficulty', props<{ data: DifficultyLevels }>());
export const startGame = createAction('[Game] Start Game');
//export const endGame = createAction('[Game] End Game');

// TODO: what is props??
export const answerQuestion = createAction('[Game] Answer Question', props<{ data: number }>());