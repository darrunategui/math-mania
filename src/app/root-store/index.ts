import { MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { GameState } from '../game/store';


export interface AppState {
  [GameState.gameFeatureKey]: GameState.State;
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
