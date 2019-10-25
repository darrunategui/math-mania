import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { asapScheduler, Subject, asyncScheduler, animationFrameScheduler } from 'rxjs';
import { subscribeOn, observeOn } from 'rxjs/operators';
import { ArithmeticOperations, MathQuestion } from '../model';

@Component({
  selector: 'math-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, AfterViewInit {

  @ViewChild('answerInput', { static: false }) inputBox !: ElementRef;

  @Output() questionAnswered = new EventEmitter<void>();

  @Input()
  get question() { return this._question; }
  set question(value: MathQuestion) {
    this._question = value;
    this.inputAnswer = null;
  }
  private _question: MathQuestion = { leftOperand: NaN, rightOperand: NaN, operation: ArithmeticOperations.None, answer: NaN };

  get inputAnswer() { return this._inputAnswer; }
  set inputAnswer(value: number) {
    this._inputAnswer = value;
    if (this._inputAnswer == this.question.answer) {
      this.questionAnswered$.next();
    }
  }
  private _inputAnswer: number;

  private questionAnswered$ = new Subject<void>();

  ngOnInit() {
    // Since the event emitter is going to be triggered in the setter of inputAnswer,
    // and this subsequently can trigger another setting on inputAnswer (clearing it)
    // it's best to execute the event on an asap scheduler to give the inputAnswer setter
    // the ability to finish executing
    this.questionAnswered$.pipe(observeOn(animationFrameScheduler)).subscribe(() => {
      this.questionAnswered.emit();
    });
  }

  ngAfterViewInit(): void {
    this.inputBox.nativeElement.focus();
  }

  get operationSymbol() {
    switch(this.question && this.question.operation) {
      case ArithmeticOperations.Multiplication: return 'x';
      case ArithmeticOperations.Subtraction: return '-';
      case ArithmeticOperations.Addition: return '+';
      default: return '?';
    }
  }
}
