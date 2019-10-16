import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArithmeticOperations, GameData, MathQuestion } from '../model';
import { GameService } from './game.service';
import { timer } from 'rxjs';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameData: GameData;
  question: MathQuestion;
  questionQueue: MathQuestion[] = [];

  ellapsedTime: number;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.gameData = this.route.snapshot.data as GameData;
    this.questionQueue = Array(20).fill(null).map(() => this.gameService.getRandomQuestion(this.gameData.difficulty, ArithmeticOperations.Multiplication));
  }

  startGame() {
    this.generateQuestion();
  }

  questionAnswered() {
    if (this.questionQueue.length == 0) {
      // finished the game!
    }
    else {
      this.generateQuestion();
    }
  }

  generateQuestion() {
    this.question = this.questionQueue.shift();
  }
}
