import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromGame from './game.reducer';


export interface AppState {
  [fromGame.gameFeatureKey]: fromGame.GameState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromGame.gameFeatureKey]: fromGame.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
