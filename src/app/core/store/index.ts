import { GameState } from '../../game/store';
import { CommonState } from './common';

export { RootStoreModule } from './root-store.module';

export interface RootState {
  [GameState.gameFeatureKey]: GameState.State;
  [CommonState.commonFeatureKey]: CommonState.State
}
