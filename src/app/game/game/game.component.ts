import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameActions, GameSelectors } from '../store';
import { StopwatchService } from '../../core/services/stopwatch.service';
import { GameData } from '../../model';
import { RootState } from '../../root-store';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [StopwatchService]
})
export class GameComponent implements OnInit {

  question$ = this.store.select(GameSelectors.selectQuestion);
  questionQueue$ = this.store.select(GameSelectors.selectQuestionsLeft);

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
}
