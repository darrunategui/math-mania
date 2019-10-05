import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { GameData } from '../model';

@Component({
  selector: 'math-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameData: GameData;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.gameData = this.route.snapshot.data as GameData;
  }

}
