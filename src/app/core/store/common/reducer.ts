import { Action, createReducer, on } from '@ngrx/store';
import { initialState, State } from './state';
import { _setIsBusy } from './actions';

const featureReducer = createReducer(
    initialState,
    on(_setIsBusy, (state, { isBusy }) => ({ ...state, isBusy }))
  );

  export function reducer(state: State | undefined, action: Action) {
    return featureReducer(state, action);
  }
