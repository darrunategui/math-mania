import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'math-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() min: number = 1;
  @Input() max: number = 12;
  @Output() questionAnswered = new EventEmitter<void>();

  leftNum: number;
  rightNum: number;
  private _correctAnswer: number;
  private _inputAnswer: number;

  get inputAnswer() { return this._inputAnswer; }
  set inputAnswer(value: number) { 
    this._inputAnswer = value;
    if (this._inputAnswer && this._correctAnswer && this._inputAnswer == this._correctAnswer) {
      //todo: emit how long it took
      this.questionAnswered.emit();
    }
   }

  constructor() { }

  ngOnInit() {
    this.randomize();
  }

  randomize() {
    // todo: begin timer
    this._inputAnswer = null;
    this.leftNum = this.getRandomNumberWithinRange();
    this.rightNum = this.getRandomNumberWithinRange();
    this._correctAnswer = this.leftNum * this.rightNum;
  }

  private getRandomNumberWithinRange() {
      const min = Math.ceil(this.min);
      const max = Math.floor(this.max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
