import { Action, createReducer, on } from '@ngrx/store';
import { MathQuestion, DifficultyLevels, GameStatus } from 'src/app/model';
import { setDifficulty } from '../actions/game.actions';


export const gameFeatureKey = 'game';

export interface GameState {
  status: GameStatus,
  question?: MathQuestion,
  difficulty?: DifficultyLevels,
  questionsQueue: MathQuestion[],
  ellapsedTime: number
}

export const initialState: GameState = {
  status: GameStatus.NotStarted,
  questionsQueue: [],
  ellapsedTime: 0
};

const gameReducer = createReducer(
  initialState,
  on(setDifficulty, (state, { difficulty }) => ({ ...state, difficulty: difficulty }))
);

export function reducer(state: GameState | undefined, action: Action) {
  return gameReducer(state, action);
}
