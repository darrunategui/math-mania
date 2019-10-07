import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { GameData, ArithmeticOperations } from '../model';
import { GameService } from './game.service';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameData: GameData;

  leftOperand: number;
  rightOperand: number;
  operation: ArithmeticOperations;
  correctAnswer: number;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.gameData = this.route.snapshot.data as GameData;
  }

}
