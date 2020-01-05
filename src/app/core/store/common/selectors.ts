import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, commonFeatureKey } from './state';
import { RootState } from '@mathmania/core/store';


export const selectCommon = createFeatureSelector<RootState, State>(commonFeatureKey);

export const isBusy = createSelector(selectCommon, state => state.isBusy);
