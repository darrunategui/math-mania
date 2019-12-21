import { Injectable, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StopwatchService implements OnDestroy {

  get ellapsedTime() { return this.counter || 0; }
  get isRunning() { return this.running; }

  private counter: number;
  private timerRef;
  private running: boolean = false;

  getProgress$(interval: number) {
    return timer(0, interval).pipe(map(x => this.ellapsedTime));
  }

  toggle() {
    this.running = !this.running;
    if (this.running) {
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
      });
    } else {
      clearInterval(this.timerRef);
    }
  }

  reset() {
    this.running = false;
    this.counter = undefined;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

}
