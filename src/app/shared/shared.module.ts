import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StopwatchPipe } from './pipes/stopwatch.pipe';
import { CountDownComponent } from './components/count-down/count-down.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NumericOnlyDirective } from './directive/numeric-only.directive';

const sharedModules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
];

const sharedComponents = [
  StopwatchPipe,
  CountDownComponent,
  NumericOnlyDirective
]

@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    ...sharedModules
  ],
  exports: [
    ...sharedModules,
    ...sharedComponents
  ]
})
export class SharedModule { }
