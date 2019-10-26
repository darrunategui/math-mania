import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { LevelChooserComponent } from './level-chooser/level-chooser.component';
import { SharedModule } from './shared/shared.module';
import { GameComponent } from './game/game.component';
import { CountDownComponent } from './count-down/count-down.component';
import { CreditsComponent } from './credits/credits.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    LevelChooserComponent,
    GameComponent,
    CountDownComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
