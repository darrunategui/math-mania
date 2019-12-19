import { createReducer, Action, on } from '@ngrx/store';
import { GameStatus } from 'src/app/model';
import { answerQuestion, setDifficulty, setEllapsedTime, setQuestions, startGame } from './actions';
import { initialState, State } from './state';

const gameReducer = createReducer(
    initialState,
    on(setDifficulty, (state, { difficulty }) => ({ ...state, difficulty })),
    on(setEllapsedTime, (state, { ellapsedTime }) => ({ ...state, ellapsedTime })),
    on(setQuestions, (state, { questionsLeft, nextQuestion }) => ({ ...state, questionsQueue: questionsLeft, question: nextQuestion })),
    on(startGame, (state) => ({ ...state, status: GameStatus.InProgress })),
    on(answerQuestion, (state) => (state)),
  );
  
  export function reducer(state: State | undefined, action: Action) {
    return gameReducer(state, action);
  }