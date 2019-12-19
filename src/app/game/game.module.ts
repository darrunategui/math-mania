import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LevelChooserComponent } from './level-chooser/level-chooser.component';
import { QuestionComponent } from './question/question.component';
import { GameComponent } from './game/game.component';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';


@NgModule({
  declarations: [
    LevelChooserComponent,
    QuestionComponent,
    GameComponent
  ],
  imports: [
    SharedModule,
    GameRoutingModule
  ]
})
export class GameModule { }