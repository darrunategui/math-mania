import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from "./game/game.component";
import { GameData, DifficultyLevels } from '../model';
import { LevelChooserComponent } from './level-chooser/level-chooser.component';

const routes: Routes = [
  {
    path: 'levels',
    component: LevelChooserComponent
  },
  {
    path: 'easy',
    component: GameComponent,
    data: <GameData>{ difficulty: DifficultyLevels.Easy }
  },
  {
    path: 'medium',
    component: GameComponent,
    data: <GameData>{ difficulty: DifficultyLevels.Medium }
  },
  {
    path: 'hard',
    component: GameComponent,
    data: <GameData>{ difficulty: DifficultyLevels.Hard }
  },
  {
    path: 'impossible',
    component: GameComponent,
    data: <GameData>{ difficulty: DifficultyLevels.Impossible }
  },
  {
    path: '**',
    redirectTo: 'levels'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
