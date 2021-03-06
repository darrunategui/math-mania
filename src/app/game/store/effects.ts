import { Injectable } from '@angular/core';
import { MathQuestionsService } from '@mathmania/core/services/math-questions.service';
import { StopwatchService } from '@mathmania/core/services/stopwatch.service';
import { MathOperations, GameStatus } from '@mathmania/model';
import { RootState } from '@mathmania/core/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { merge, of, Subject } from 'rxjs';
import { concatMap, filter, map, mergeMap, takeUntil, tap, withLatestFrom, delay, switchMap } from 'rxjs/operators';
import { answerQuestion, endGame, resetGame, setEllapsedTime, setQuestions, startGame, setStatus } from './actions';
import { selectGame } from './selectors';

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions,
    private store$: Store<RootState>,
    private stopwatch: StopwatchService,
    private questionsService: MathQuestionsService) {
  }

  private stopwatchCancelled$ = new Subject<void>();
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
      const difficulty = gameState.difficulty;

      const size = 5;// TODO: change to 20 or depending on difficulty
      let questions = Array(size).fill(null).map(() => this.questionsService.getRandomQuestion(difficulty, MathOperations.Multiplication));

      const setQuestionsAction = of(setQuestions({ questionsLeft: questions.slice(1), nextQuestion: questions[0] })).pipe(
        tap(() => this.stopwatch.toggle())
      );
      const stopWatchAction = this.stopwatch.getProgress$(33).pipe(takeUntil(this.stopwatchCancelled$), map(ellapsedTime => setEllapsedTime({ ellapsedTime })));

      return merge(setQuestionsAction, stopWatchAction);
    })
  ));

  checkAnswer$ = createEffect(() => this.actions$.pipe(
    ofType(answerQuestion),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectGame)))
    )),
    filter(([action, gameState]) => !!(gameState.status & GameStatus.InProgress) && !(gameState.status & GameStatus.AnswerCorrect) && !!gameState.question && gameState.question.answer == action.answer),
    mergeMap(([action, gameState]) => {
      if (gameState.questionsQueue.length > 0) {
        // set up the next questions
        const nextQuestion = gameState.questionsQueue[0];
        const questionsLeft = gameState.questionsQueue.slice(1);

        this.stopwatch.toggle();
        // set the temperary status showing the answer was corrects
        const setState1Action = of(setStatus({ status: gameState.status | GameStatus.AnswerCorrect }));
        // after a quick delay set the next question
        const setQuestionsAction = of(setQuestions({ questionsLeft, nextQuestion })).pipe(delay(1000));
        // chaining on the previous observable, set the status back and trigger the stopwatch
        const setState2Action = setQuestionsAction.pipe(
          map(() => setStatus({ status: gameState.status & ~GameStatus.AnswerCorrect })),
          tap(() => this.stopwatch.toggle())
        );

        return merge(setState1Action, setQuestionsAction, setState2Action);
      }
      else {
        // all questions have been answered. End the game
        return of(endGame());
      }
    })
  ));

  endGame$ = createEffect(() => this.actions$.pipe(
    ofType(endGame),
    map(() => {
      this.stopwatchCancelled$.next();
      if (this.stopwatch.isRunning) {
        this.stopwatch.toggle();
      }
      return setEllapsedTime({ ellapsedTime: this.stopwatch.ellapsedTime });
    })
  ));

  resetGame$ = createEffect(() => this.actions$.pipe(
    ofType(resetGame),
    filter(() => this.stopwatch.isRunning || this.stopwatch.ellapsedTime !== 0),
    tap(() => {
      this.stopwatchCancelled$.next();
      this.stopwatch.reset();
    })
  )/* the same action may be dispatched but will be handled differently the second time
    * since the stopwatch will have been reset. This ensures the game state will be fully
    * reset the next time the game is started.
    */
  );
}
