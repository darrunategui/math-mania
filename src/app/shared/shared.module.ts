import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { RouterModule } from '@angular/router';
import { StopwatchPipe } from './pipes/stopwatch.pipe';



@NgModule({
  declarations: [StopwatchPipe],
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
    StopwatchPipe
  ]
})
export class SharedModule { }
