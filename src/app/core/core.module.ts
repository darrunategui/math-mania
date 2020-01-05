import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StopwatchService } from './services/stopwatch.service';
import { RootStoreModule } from './store';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { SharedModule } from '@mathmania/shared/shared.module';

const coreModules = [
  BrowserModule,
  BrowserAnimationsModule,
  RootStoreModule
];

const coreComponents = [
  MainNavComponent
];

@NgModule({
  declarations: [
    ...coreComponents
  ],
  imports: [
    ...coreModules,
    SharedModule
  ],
  exports: [
    ...coreModules,
    ...coreComponents
  ],
  providers: [
    StopwatchService
  ]
})
export class CoreModule { }
