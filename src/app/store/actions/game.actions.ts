import { createAction, props } from '@ngrx/store';


export const startGame = createAction('[Game] Start Game');
//export const endGame = createAction('[Game] End Game');

// TODO: what is props??
export const answerQuestion = createAction('[Game] Answer Question', props<{ data: number }>());



/*
export const loadGames = createAction(
  '[Game] Load Games'
);

export const loadGamesSuccess = createAction(
  '[Game] Load Games Success',
  props<{ data: any }>()
);

export const loadGamesFailure = createAction(
  '[Game] Load Games Failure',
  props<{ error: any }>()
);
*/