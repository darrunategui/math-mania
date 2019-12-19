import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchService } from './services/stopwatch.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    StopwatchService
  ]
})
export class CoreModule { }
