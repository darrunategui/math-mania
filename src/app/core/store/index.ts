import { NgModule } from '@angular/core';
import { environment } from '@env';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GameState } from '../../game/store';
import { CommonState, CommonStoreModule } from './common';

export interface RootState {
  [GameState.gameFeatureKey]: GameState.State;
  [CommonState.commonFeatureKey]: CommonState.State
}

@NgModule({
  imports: [
    CommonStoreModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
  ]
})
export class RootStoreModule {}
