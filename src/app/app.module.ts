import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './game/question/question.component';
import { LevelChooserComponent } from './game/level-chooser/level-chooser.component';
import { SharedModule } from './shared/shared.module';
import { GameComponent } from './game/game/game.component';
import { CountDownComponent } from './shared/components/count-down/count-down.component';
import { CreditsComponent } from './credits/credits.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './store/effects/game.effects';
import { StopwatchService } from './core/services/stopwatch.service';
import { GameModule } from './game/game.module';


@NgModule({
  declarations: [
    AppComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GameModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([GameEffects])
  ],
  providers: [StopwatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
