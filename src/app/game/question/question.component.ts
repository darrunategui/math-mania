import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MathOperations, MathQuestion } from '../../model';
import { RootState } from '../../root-store';
import { GameActions } from '../store';

@Component({
  selector: 'math-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements AfterViewInit {

  @ViewChild('answerInput', { static: false }) inputBox !: ElementRef;

  @Output() questionAnswered = new EventEmitter<void>(true);

  @Input()
  get question() { return this._question; }
  set question(value: MathQuestion) {
    this._question = value;
    this._inputAnswer = null;
  }
  private _question: MathQuestion = { leftOperand: NaN, rightOperand: NaN, operation: MathOperations.None, answer: NaN };

  get inputAnswer() { return this._inputAnswer; }
  set inputAnswer(value: number) {
    this._inputAnswer = value;
    this.store.dispatch(GameActions.answerQuestion({ answer: value }));
  }
  private _inputAnswer: number;

  constructor(private store: Store<RootState>) {}

  ngAfterViewInit(): void {
    this.inputBox.nativeElement.focus();
  }

  get operationSymbol() {
    switch(this.question && this.question.operation) {
      case MathOperations.Multiplication: return 'x';
      case MathOperations.Subtraction: return '-';
      case MathOperations.Addition: return '+';
      default: return '?';
    }
  }
}
