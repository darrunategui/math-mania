import { AppState } from '../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState, gameFeatureKey } from '../reducers/game.reducer';


export const selectGame = createFeatureSelector<AppState, GameState>(gameFeatureKey);

export const selectEllapsedTime = createSelector(selectGame, gameState => gameState.ellapsedTime);
export const selectQuestion = createSelector(selectGame, gameState => gameState.question);
export const selectQuestionsLeft = createSelector(selectGame, gameState => gameState.questionsQueue);