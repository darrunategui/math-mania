import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { RouterModule } from '@angular/router';
import { StopwatchPipe } from './pipes/stopwatch.pipe';
import { CountDownComponent } from './components/count-down/count-down.component';



@NgModule({
  declarations: [
    StopwatchPipe,
    CountDownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DigitOnlyModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DigitOnlyModule,
    RouterModule,
    StopwatchPipe,
    CountDownComponent
  ]
})
export class SharedModule { }
