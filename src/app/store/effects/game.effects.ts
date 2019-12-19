import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { StopwatchService } from 'src/app/core/services/stopwatch.service';
import * as GameActions from '../actions/game.actions';
import { tap, mergeMap, map, withLatestFrom, concatMap, switchMap } from 'rxjs/operators';
import { selectGame } from '../selectors/game.selectors';
import { of, merge } from 'rxjs';
import { MathQuestionsService } from 'src/app/core/services/math-questions.service';
import { MathOperations } from 'src/app/model';

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions, 
    private store$: Store<AppState>, 
    private stopwatch: StopwatchService,
    private questionsService: MathQuestionsService) {
  }

  startStopwatch$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.startGame),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectGame)))
    )),
    mergeMap(([action, gameState]) => {
      if (gameState.difficulty === undefined) {
        // the difficulty needs to be set first
        throw action.type + ' can not be called before difficulty has been set';
      }

      const size = 5;// TODO: change to 20 or depending on difficulty
      let questions = Array(size).fill(null).map(() => this.questionsService.getRandomQuestion(gameState.difficulty, MathOperations.Multiplication));
      
      const setQuestionsAction = of(GameActions.setQuestions({ questionsLeft: questions.slice(1), nextQuestion: questions[0] })).pipe(
        tap(() => this.stopwatch.toggle())
      );
      const stopWatchAction = this.stopwatch.getProgress$(33).pipe(map(ellapsedTime => GameActions.setEllapsedTime({ ellapsedTime })));

      return merge(setQuestionsAction, stopWatchAction);
    })
  ));

  checkAnswer$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.answerQuestion),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectGame)))
    )),
    map(([action, gameState]) => {
      if (!gameState.question || gameState.question.answer != action.answer) {
        return GameActions.answerQuestionFail();
      }
      else {
        return GameActions.answerQuestionSuccess();
      }
    })
  ));

  answerCorrect$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.answerQuestionSuccess),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectGame)))
    )),
    map(([action, gameState]) => {
      if (gameState.questionsQueue.length > 0) {
        const nextQuestion = gameState.questionsQueue[0];
        const questionsLeft = gameState.questionsQueue.slice(1);
        return GameActions.setQuestions({ questionsLeft, nextQuestion });
      }
      else {
        return GameActions.endGame();
      }
    })
  ));

  endGame$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.endGame),
    tap(() => this.stopwatch.toggle())
  ), { dispatch: false });
}
