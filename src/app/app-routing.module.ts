import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LevelChooserComponent } from './level-chooser/level-chooser.component';
import { DifficultyLevels } from './model/difficulty-levels.enum';
import { GameData } from './model';


const routes: Routes = [
  {
    path: '',
    component: LevelChooserComponent,
    pathMatch: 'full'
  },
  {
    path: 'game/easy',
    component: GameComponent,
    data: <GameData>{ difficulty: DifficultyLevels.Easy }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
