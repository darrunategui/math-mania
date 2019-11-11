import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GameData, MathOperations, MathQuestion } from '../model';
import { MathQuestionsService } from '../shared/services/math-questions.service';
import { StopwatchService } from '../shared/services/stopwatch.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import * as GameActions from 'src/app/store/actions/game.actions';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [StopwatchService]
})
export class GameComponent implements OnInit {

  question: MathQuestion;
  questionQueue: MathQuestion[] = [];

  showCountDown = false;
  showStopwatch = false;
  ellapsedMillis$: Observable<number>;

  constructor(private route: ActivatedRoute,
    private questionsService: MathQuestionsService,
    private stopwatch: StopwatchService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(GameActions.setDifficulty({ difficulty: this.gameData.difficulty }));
    this.ellapsedMillis$ = this.stopwatch.getProgress$(33);
    this.startGame();
  }

  startGame() {
    this.questionQueue = [];
    this.question = null;
    this.showCountDown = true;
    this.showStopwatch = false;
    this.stopwatch.reset();
    // startQuestions will be fired when the count down expires
  }

  startQuestions() {
    this.questionQueue = Array(5).fill(null).map(() => this.questionsService.getRandomQuestion(this.gameData.difficulty, MathOperations.Multiplication));
    // show the proper counter
    this.showCountDown = false;
    this.showStopwatch = true;
    // start the game
    this.generateQuestion();
    this.stopwatch.toggle();
  }

  questionAnswered() {
    if (this.questionQueue.length == 0) {
      // finished the game!
      this.stopwatch.toggle();
    }
    else {
      // game is not done, generate another question
      this.stopwatch.toggle();
      setTimeout(() => {
        this.generateQuestion();
        this.stopwatch.toggle();
      }, 700);
    }
  }

  private generateQuestion() {
    this.question = this.questionQueue.shift();
  }

  private get gameData() {
    return this.route.snapshot.data as GameData;
  }
}
