import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RootState } from '@mathmania/core/store';
import { Store } from '@ngrx/store';
import { MathOperations, MathQuestion, GameStatus } from '../../model';
import { GameActions, GameSelectors } from '../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'math-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements AfterViewInit {

  @ViewChild('answerInput') inputBox!: ElementRef;

  @Input()
  get question() { return this._question; }
  set question(value: MathQuestion) {
    this._question = value;
    this._inputAnswer = null;
  }
  private _question!: MathQuestion;

  get inputAnswer() { return this._inputAnswer || NaN; }
  set inputAnswer(value: number) {
    this._inputAnswer = value;
    this.store.dispatch(GameActions.answerQuestion({ answer: value }));
  }
  private _inputAnswer: number | null = null;

  isAnswerCorrect$ = this.store.select(GameSelectors.selectStatus).pipe(map(status => status & GameStatus.AnswerCorrect));

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
