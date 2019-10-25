import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArithmeticOperations, GameData, MathQuestion } from '../model';
import { GameService } from './game.service';
import { timer, Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameData: GameData;
  question: MathQuestion;
  questionQueue: MathQuestion[] = [];

  ellapsedMillis: number;
  showCountDown = true;
  showCountUp = false;

  private startMillis: number;
  private countUpCancelled$ = new Subject<void>();



  constructor(private route: ActivatedRoute, private gameService: GameService) {
  }

  ngOnInit() {
    this.gameData = this.route.snapshot.data as GameData;
  }

  startGame() {
    this.questionQueue = Array(20).fill(null).map(() => this.gameService.getRandomQuestion(this.gameData.difficulty, ArithmeticOperations.Multiplication));
    // show the proper counter
    this.showCountDown = false;
    this.showCountUp = true;
    // start the game
    this.generateQuestion();
    this.startMillis = Date.now();
    this.recordEllapsedMillis();

    // every 33ms record the ellapsed time
    // 33ms since that still looks like it's real time in the UI
    timer(0, 33)
      .pipe(
        takeUntil(this.countUpCancelled$),
        finalize(() => this.recordEllapsedMillis())
    ).subscribe(() => this.recordEllapsedMillis());
  }

  questionAnswered() {
    if (this.questionQueue.length == 0) {
      // finished the game!
      this.countUpCancelled$.next();
    }
    else {
      // game is not done, generate another question
      this.generateQuestion();
    }
  }

  private generateQuestion() {
    this.question = this.questionQueue.shift();
  }

  private recordEllapsedMillis() {
    return this.ellapsedMillis = Date.now() - this.startMillis;
  }
}
