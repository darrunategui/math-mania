import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { StopwatchService } from 'src/app/shared/services/stopwatch.service';
import * as GameActions from '../actions/game.actions';
import { tap, mergeMap, map, withLatestFrom, concatMap } from 'rxjs/operators';
import { selectGame } from '../selectors/game.selectors';
import { of } from 'rxjs';

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions, private store$: Store<AppState>, private stopwatch: StopwatchService) {
  }

  startStopwatch$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.startGame),
    tap(() => this.stopwatch.toggle()),
    mergeMap(() => this.stopwatch.getProgress$(33).pipe(map(ellapsedTime => GameActions.setEllapsedTime({ ellapsedTime }))))
  ));

  checkAnswer$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.answerQuestion),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectGame)))
    )),
    mergeMap(([action, gameState]) => {
      if (!gameState.question || gameState.question.answer != action.answer) {
        return of(GameActions.answerQuestionFail);
      }
      else {
        if (gameState.questionsQueue.length > 0) {
          const nextQuestion = gameState.questionsQueue[0];
          const questionsLeft = gameState.questionsQueue.slice(1);
          return of(GameActions.answerQuestionSuccess({ questionsLeft, nextQuestion }));
        }
        else {
          return of(GameActions.endGameSuccess);
        }
      }
    })
  ));
}
