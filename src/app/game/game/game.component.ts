import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GameData, MathOperations, MathQuestion } from '../../model';
import { MathQuestionsService } from '../../core/services/math-questions.service';
import { StopwatchService } from '../../core/services/stopwatch.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import * as GameActions from 'src/app/store/actions/game.actions';
import { selectEllapsedTime, selectQuestion, selectQuestionsLeft } from '../../store/selectors/game.selectors';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [StopwatchService]
})
export class GameComponent implements OnInit {

  question$ = this.store.select(selectQuestion);
  questionQueue$ = this.store.select(selectQuestionsLeft);

  showCountDown = false;
  showStopwatch = false;
  ellapsedMillis$ = this.store.select(selectEllapsedTime);

  constructor(private route: ActivatedRoute,
    private store: Store<AppState>
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
