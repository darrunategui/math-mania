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
    path: 'game/medium',
    component: GameComponent,
    data: <GameData>{ difficulty: DifficultyLevels.Medium }
  },
  {
    path: 'game/hard',
    component: GameComponent,
    data: <GameData>{ difficulty: DifficultyLevels.Hard }
  },
  {
    path: 'game/impossible',
    component: GameComponent,
    data: <GameData>{ difficulty: DifficultyLevels.Impossible }
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
