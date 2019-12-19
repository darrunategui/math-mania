import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game/game.component';
import { LevelChooserComponent } from './game/level-chooser/level-chooser.component';
import { DifficultyLevels } from './model/difficulty-levels.enum';
import { GameData } from './model';
import { CreditsComponent } from './credits/credits.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full'
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  },
  {
    path: 'credits',
    component: CreditsComponent
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
