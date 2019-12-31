import { Injectable, OnDestroy } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable()
export class StopwatchService implements OnDestroy {

  get ellapsedTime() { return this.counter; }
  get isRunning() { return this.running; }

  private counter: number = 0;
  private running: boolean = false;
  private stopped$ = new Subject<void>();

  getProgress$(interval: number) {
    return timer(0, interval).pipe(map(x => this.ellapsedTime));
  }

  toggle() {
    this.running = !this.running;
    if (this.running) {
      const startTime = Date.now() - this.counter;
      timer(0, 1).pipe(takeUntil(this.stopped$)).subscribe(() => {
        this.counter = Date.now() - startTime;
      });
    } else {
      this.stopped$.next();
    }
  }

  reset() {
    if (this.running) {
      this.toggle();
    }
    this.counter = 0;
  }

  ngOnDestroy() {
    this.reset();
  }

}
