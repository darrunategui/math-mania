import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { asapScheduler, Subject, asyncScheduler, animationFrameScheduler } from 'rxjs';
import { subscribeOn, observeOn } from 'rxjs/operators';
import { MathOperations, MathQuestion } from '../model';

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
    if (this.isAnswerCorrect) {
      this.questionAnswered.emit();
    }
  }
  private _inputAnswer: number;

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

  get isAnswerCorrect() {
    return this.question && this.inputAnswer == this.question.answer;
  }
}
