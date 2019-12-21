import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StopwatchPipe } from './pipes/stopwatch.pipe';
import { CountDownComponent } from './components/count-down/count-down.component';
import { DigitOnlyDirective } from './directive/digit-only.directive';



@NgModule({
  declarations: [
    StopwatchPipe,
    CountDownComponent,
    DigitOnlyDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    StopwatchPipe,
    CountDownComponent,
    DigitOnlyDirective
  ]
})
export class SharedModule { }
