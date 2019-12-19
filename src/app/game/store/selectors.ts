import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, gameFeatureKey } from './state';
import { AppState } from 'src/app/root-store';


export const selectGame = createFeatureSelector<AppState, State>(gameFeatureKey);

export const selectEllapsedTime = createSelector(selectGame, gameState => gameState.ellapsedTime);
export const selectQuestion = createSelector(selectGame, gameState => gameState.question);
export const selectQuestionsLeft = createSelector(selectGame, gameState => gameState.questionsQueue);