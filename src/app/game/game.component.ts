import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArithmeticOperations, GameData, MathQuestion } from '../model';
import { GameService } from './game.service';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  private startMillis: number;
  private countUpCancelled$ = new Subject<void>();

  showCountDown = true;
  showCountUp = false;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.gameData = this.route.snapshot.data as GameData;
    this.questionQueue = Array(5).fill(null).map(() => this.gameService.getRandomQuestion(this.gameData.difficulty, ArithmeticOperations.Multiplication));
  }

  startGame() {
    this.showCountDown = false;
    this.showCountUp = true;
    this.generateQuestion();
    this.startMillis = Date.now();
    this.recordEllapsedMillis();
    timer(0, 30).pipe(takeUntil(this.countUpCancelled$)).subscribe(() => this.recordEllapsedMillis());
  }

  questionAnswered() {
    if (this.questionQueue.length == 0) {
      // finished the game!
      this.countUpCancelled$.next();
      this.recordEllapsedMillis();
    }
    else {
      this.generateQuestion();
    }
  }

  generateQuestion() {
    this.question = this.questionQueue.shift();
  }

  private recordEllapsedMillis() {
    return this.ellapsedMillis = Date.now() - this.startMillis;
  }
}
