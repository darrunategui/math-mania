import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameActions, GameSelectors } from '../store';
import { StopwatchService } from '../../core/services/stopwatch.service';
import { GameData } from '../../model';
import { RootState } from '../../root-store';
import { observeOn } from 'rxjs/operators';
import { animationFrameScheduler } from 'rxjs';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [StopwatchService]
})
export class GameComponent implements OnInit, OnDestroy {
  question$ = this.store.select(GameSelectors.selectQuestion).pipe(observeOn(animationFrameScheduler));

  showCountDown = false;
  showStopwatch = false;
  ellapsedMillis$ = this.store.select(GameSelectors.selectEllapsedTime);

  constructor(private route: ActivatedRoute,
    private store: Store<RootState>
  ) { }

  ngOnInit() {
    this.store.dispatch(GameActions.setDifficulty({ difficulty: this.gameData.difficulty }));
    this.startGame();
  }

  startGame() {
    this.showCountDown = true;
    this.showStopwatch = false;
    // startQuestions will be fired when the count down expires
  }

  startQuestions() {
    this.store.dispatch(GameActions.startGame());
    // show the proper counter
    this.showCountDown = false;
    this.showStopwatch = true;
  }

  private get gameData() {
    return this.route.snapshot.data as GameData;
  }

  ngOnDestroy(): void {
    this.store.dispatch(GameActions.resetGame());
  }
}
