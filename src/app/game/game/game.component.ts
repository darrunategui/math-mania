import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameActions, GameSelectors } from '../store';
import { StopwatchService } from '../../core/services/stopwatch.service';
import { GameData, GameStatus } from '../../model';
import { RootState } from '../../root-store';
import { observeOn, map } from 'rxjs/operators';
import { animationFrameScheduler } from 'rxjs';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [StopwatchService]
})
export class GameComponent implements OnInit, OnDestroy {
  question$ = this.store.select(GameSelectors.selectQuestion).pipe(observeOn(animationFrameScheduler));
  isDone$ = this.store.select(GameSelectors.selectStatus).pipe(map(x => x === GameStatus.Done));

  showCountDown = false;
  showStopwatch = false;
  ellapsedMillis$ = this.store.select(GameSelectors.selectEllapsedTime);

  private get gameData() { return this.route.snapshot.data as GameData; }

  constructor(private route: ActivatedRoute,
    private store: Store<RootState>
  ) { }

  ngOnInit() {
    this.store.dispatch(GameActions.setDifficulty({ difficulty: this.gameData.difficulty }));
    this.showCountDown = true;
    this.showStopwatch = false;
  }

  startQuestions() {
    this.store.dispatch(GameActions.startGame());
    // show the proper counter
    this.showCountDown = false;
    this.showStopwatch = true;
  }

  reset() {
    this.store.dispatch(GameActions.resetGame());
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.store.dispatch(GameActions.resetGame());
  }
}
