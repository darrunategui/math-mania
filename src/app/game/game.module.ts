import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LevelChooserComponent } from './level-chooser/level-chooser.component';
import { QuestionComponent } from './question/question.component';
import { GameComponent } from './game/game.component';
import { GameRoutingModule } from './game-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { gameFeatureKey } from './store/state';
import { reducer } from './store/reducer';
import { GameEffects } from './store/effects';


@NgModule({
  declarations: [
    LevelChooserComponent,
    QuestionComponent,
    GameComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(gameFeatureKey, reducer),
    EffectsModule.forFeature([GameEffects]),
    GameRoutingModule
  ]
})
export class GameModule { }