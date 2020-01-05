import * as CommonSelectors from './selectors';
import * as CommonState from './state';
import * as CommonActions from './actions';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonEffects } from './effects';
import { reducer } from './reducer';

export { CommonActions, CommonState, CommonSelectors };


@NgModule({
  imports: [
    StoreModule.forFeature(CommonState.commonFeatureKey, reducer),
    EffectsModule.forFeature([CommonEffects])
  ]
})
export class CommonStoreModule { }
