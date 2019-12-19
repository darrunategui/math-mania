import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { merge, of } from 'rxjs';
import { concatMap, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { MathQuestionsService } from '@mathmania/core/services/math-questions.service';
import { MathOperations } from '@mathmania/model';
import { startGame, setQuestions, setEllapsedTime, answerQuestion, answerQuestionFail, answerQuestionSuccess, endGame } from './actions';
import { selectGame } from './selectors';
import { RootState } from '@mathmania/root-store';
import { StopwatchService } from '@mathmania/core/services/stopwatch.service';

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions,
    private store$: Store<RootState>,
    private stopwatch: StopwatchService,
    private questionsService: MathQuestionsService) {
  }

  startStopwatch$ = createEffect(() => this.actions$.pipe(
    ofType(startGame),
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

      const setQuestionsAction = of(setQuestions({ questionsLeft: questions.slice(1), nextQuestion: questions[0] })).pipe(
        tap(() => this.stopwatch.toggle())
      );
      const stopWatchAction = this.stopwatch.getProgress$(33).pipe(map(ellapsedTime => setEllapsedTime({ ellapsedTime })));

      return merge(setQuestionsAction, stopWatchAction);
    })
  ));

  checkAnswer$ = createEffect(() => this.actions$.pipe(
    ofType(answerQuestion),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectGame)))
    )),
    map(([action, gameState]) => {
      if (!gameState.question || gameState.question.answer != action.answer) {
        return answerQuestionFail();
      }
      else {
        return answerQuestionSuccess();
      }
    })
  ));

  answerCorrect$ = createEffect(() => this.actions$.pipe(
    ofType(answerQuestionSuccess),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectGame)))
    )),
    map(([action, gameState]) => {
      if (gameState.questionsQueue.length > 0) {
        const nextQuestion = gameState.questionsQueue[0];
        const questionsLeft = gameState.questionsQueue.slice(1);
        return setQuestions({ questionsLeft, nextQuestion });
      }
      else {
        return endGame();
      }
    })
  ));

  endGame$ = createEffect(() => this.actions$.pipe(
    ofType(endGame),
    tap(() => this.stopwatch.toggle())
  ), { dispatch: false });
}
