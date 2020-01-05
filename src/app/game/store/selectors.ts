import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, gameFeatureKey } from './state';
import { RootState } from '@mathmania/core/store';


export const selectGame = createFeatureSelector<RootState, State>(gameFeatureKey);

export const selectEllapsedTime = createSelector(selectGame, gameState => gameState.ellapsedTime);
export const selectQuestion = createSelector(selectGame, gameState => gameState.question);
export const selectQuestionsLeft = createSelector(selectGame, gameState => gameState.questionsQueue);
export const selectStatus = createSelector(selectGame, gameState => gameState.status);
