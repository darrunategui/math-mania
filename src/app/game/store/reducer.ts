import { createReducer, Action, on } from '@ngrx/store';
import { GameStatus } from '@mathmania/model';
import { answerQuestion, setDifficulty, setEllapsedTime, setQuestions, startGame, resetGame, endGame, setStatus } from './actions';
import { initialState, State } from './state';

const gameReducer = createReducer(
    initialState,
    on(setDifficulty, (state, { difficulty }) => ({ ...state, difficulty })),
    on(setEllapsedTime, (state, { ellapsedTime }) => ({ ...state, ellapsedTime })),
    on(setQuestions, (state, { questionsLeft, nextQuestion }) => ({ ...state, questionsQueue: questionsLeft, question: nextQuestion })),
    on(setStatus, (state, { status }) => ({ ...state, status })),
    on(startGame, (state) => ({ ...state, status: GameStatus.InProgress })),
    on(endGame, (state) => ({ ...state, status: GameStatus.Done })),
    on(resetGame, () => (initialState)),
  );

  export function reducer(state: State | undefined, action: Action) {
    return gameReducer(state, action);
  }
