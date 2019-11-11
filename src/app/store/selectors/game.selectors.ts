import { AppState } from '../reducers';
import { createFeatureSelector } from '@ngrx/store';
import { GameState, gameFeatureKey } from '../reducers/game.reducer';


export const selectGame = createFeatureSelector<AppState, GameState>(gameFeatureKey);