import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs/operators';
import { endWork, startWork, _setIsBusy } from './actions';

@Injectable()
export class CommonEffects {
  private busyCounter = 0;
  constructor(private actions$: Actions) {
  }
  startWork$ = createEffect(() => this.actions$.pipe(
    ofType(startWork),
    tap(() => this.busyCounter++),
    filter(() => this.busyCounter == 1),
    map(() => _setIsBusy({ isBusy: true }))
  ));

  endWork$ = createEffect(() => this.actions$.pipe(
    ofType(endWork),
    filter(() => this.busyCounter > 0),
    tap(() => this.busyCounter--),
    filter(() => this.busyCounter == 0),
    map(() => _setIsBusy({ isBusy: false }))
  ));
}
