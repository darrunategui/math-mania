import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArithmeticOperations, GameData, MathQuestion } from '../model';
import { GameService } from './game.service';
import { timer, Subject, pipe, Subscription } from 'rxjs';
import { takeUntil, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  question: MathQuestion;
  questionQueue: MathQuestion[] = [];

  ellapsedMillis: number;
  showCountDown = false;
  showCountUp = false;

  private startMillis: number;
  private countUpSubscription: Subscription;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.questionQueue = [];
    this.question = null;
    this.showCountDown = true;
    this.showCountUp = false;
  }

  startQuestions() {
    this.questionQueue = Array(5).fill(null).map(() => this.gameService.getRandomQuestion(this.gameData.difficulty, ArithmeticOperations.Multiplication));
    // show the proper counter
    this.showCountDown = false;
    this.showCountUp = true;
    // start the game
    this.generateQuestion();
    this.startMillis = Date.now();
    this.toggleCountUpTimer();
  }

  questionAnswered() {
    if (this.questionQueue.length == 0) {
      // finished the game!
      this.toggleCountUpTimer();
    }
    else {
      // game is not done, generate another question
      this.toggleCountUpTimer();
      setTimeout(() => {
        this.generateQuestion();
        this.toggleCountUpTimer();
      }, 700);
    }
  }

  private toggleCountUpTimer() {
    if (!this.countUpSubscription || this.countUpSubscription.closed) {
      // every 33ms record the ellapsed time
      // 33ms since that still looks like it's real time in the UI
      this.recordEllapsedMillis();
      this.countUpSubscription = timer(0, 33)
        .pipe(
          tap(() => this.recordEllapsedMillis()),
          finalize(() => this.recordEllapsedMillis())
        ).subscribe();
    }
    else {
      this.countUpSubscription.unsubscribe();
    }
  }

  private generateQuestion() {
    this.question = this.questionQueue.shift();
  }

  private recordEllapsedMillis() {
    return this.ellapsedMillis = Date.now() - this.startMillis;
  }

  private get gameData() {
    return this.route.snapshot.data as GameData;
  }
}
