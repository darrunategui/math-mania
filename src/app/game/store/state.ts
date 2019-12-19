import { GameStatus, MathQuestion, DifficultyLevels } from 'src/app/model';

export const gameFeatureKey = 'game';

export interface State {
  status: GameStatus,
  question?: MathQuestion,
  difficulty?: DifficultyLevels,
  questionsQueue: MathQuestion[],
  ellapsedTime: number
}

export const initialState: State = {
  status: GameStatus.NotStarted,
  questionsQueue: [],
  ellapsedTime: 0
};