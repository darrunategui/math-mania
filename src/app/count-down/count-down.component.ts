import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { interval, of, Observable, BehaviorSubject, Subject, merge, concat } from 'rxjs';
import { take, map, switchMap, tap, finalize, flatMap } from 'rxjs/operators';

@Component({
  selector: 'math-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {

  @Input() countFrom: number;
  @Output() countDownFinished = new EventEmitter<void>();

  countDown$: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.countDown$ = merge(
      of(this.countFrom),
      interval(1200).pipe(
        take(this.countFrom),
        map(x => this.countFrom - x - 1)
      )
    ).pipe(
      finalize(() => this.countDownFinished.emit())
    );
  }

}
