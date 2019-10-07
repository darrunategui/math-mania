import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Scheduler, asapScheduler } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { ArithmeticOperations } from '../model';

@Component({
  selector: 'math-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() leftOperand: number;
  @Input() rightOperand: number;
  @Input() operation: ArithmeticOperations;
  @Input() correctAnswer: number;
  @Output() questionAnswered = new EventEmitter<void>();

  private questionAnswered$ = new Subject<void>();

  get inputAnswer() { return this._inputAnswer; }
  set inputAnswer(value: number) {
    this._inputAnswer = value;
    if (this._inputAnswer && this.correctAnswer && this._inputAnswer == this.correctAnswer) {
      this.questionAnswered$.next();
    }
  }
  private _inputAnswer: number;

  ngOnInit() {
    // Since the event emitter is going to be triggered in the setter of inputAnswer,
    // and this subsequently can trigger another setting on inputAnswer
    // it's best to execute the event on an asap scheduler to give the inputAnswer setter
    // the ability to finish executing
    this.questionAnswered$.pipe(subscribeOn(asapScheduler)).subscribe(() => {
      this.questionAnswered.emit();
    });
  }

  get operationSymbol() {
    switch(this.operation) {
      case ArithmeticOperations.Multiplication: return 'x';
      case ArithmeticOperations.Subtraction: return '-';
      case ArithmeticOperations.Addition: return '+';
      default: return '?';
    }
  }
}
