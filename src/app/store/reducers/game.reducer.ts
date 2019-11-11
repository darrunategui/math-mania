import { Action, createReducer, on } from '@ngrx/store';
import { MathQuestion, DifficultyLevels, GameStatus } from 'src/app/model';
import { setDifficulty, startGame, setEllapsedTime, answerQuestion, setQuestions } from '../actions/game.actions';


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
  on(setDifficulty, (state, { difficulty }) => ({ ...state, difficulty })),
  on(setEllapsedTime, (state, { ellapsedTime }) => ({ ...state, ellapsedTime })),
  on(setQuestions, (state, { questionsLeft, nextQuestion }) => ({ ...state, questionsQueue: questionsLeft, question: nextQuestion })),
  on(startGame, (state) => ({ ...state, status: GameStatus.InProgress })),
  on(answerQuestion, (state) => (state)),
);

export function reducer(state: GameState | undefined, action: Action) {
  return gameReducer(state, action);
}
