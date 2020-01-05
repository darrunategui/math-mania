import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchService } from './services/stopwatch.service';
import { RootStoreModule } from './store/root-store.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RootStoreModule
  ],
  providers: [
    StopwatchService
  ]
})
export class CoreModule { }
