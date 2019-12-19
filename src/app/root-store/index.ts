import { GameState } from '../game/store';


export interface RootState {
  [GameState.gameFeatureKey]: GameState.State;
}
