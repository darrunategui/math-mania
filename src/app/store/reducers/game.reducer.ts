import { Action, createReducer, on } from '@ngrx/store';


export const gameFeatureKey = 'game';

export interface State {

}

export const initialState: State = {

};

const gameReducer = createReducer(
  initialState,

);

export function reducer(state: State | undefined, action: Action) {
  return gameReducer(state, action);
}
