import { GameStatus } from '@mathmania/model';
import { Action, createReducer, on } from '@ngrx/store';
import { endGame, resetGame, setDifficulty, setEllapsedTime, setQuestions, setStatus, startGame } from './actions';
import { initialState, State } from './state';

const gameReducer = createReducer(
    initialState,
    on(setDifficulty, (state, { difficulty }) => ({ ...state, difficulty })),
    on(setEllapsedTime, (state, { ellapsedTime }) => ({ ...state, ellapsedTime })),
    on(setQuestions, (state, { questionsLeft, nextQuestion }) => ({ ...state, questionsQueue: questionsLeft, question: nextQuestion })),
    on(setStatus, (state, { status }) => ({ ...state, status })),
    on(startGame, (state) => ({ ...state, status: GameStatus.InProgress })),
    on(endGame, (state) => ({ ...state, question: undefined, questionsQueue: [], status: GameStatus.Done })),
    on(resetGame, () => (initialState)),
  );

  export function reducer(state: State | undefined, action: Action) {
    return gameReducer(state, action);
  }
