import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArithmeticOperations, GameData, MathQuestion } from '../model';
import { GameService } from './game.service';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameData: GameData;
  question: MathQuestion;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.gameData = this.route.snapshot.data as GameData;
  }

  startGame() {
    this.generateQuestion();
  }

  questionAnswered() {
    this.generateQuestion();
  }

  generateQuestion() {
    this.question = this.gameService.getRandomQuestion(this.gameData.difficulty, ArithmeticOperations.Multiplication);
  }
}
