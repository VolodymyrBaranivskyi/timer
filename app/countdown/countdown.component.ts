/*import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, timer, NEVER, BehaviorSubject, fromEvent, of } from 'rxjs';
import { map, tap, takeWhile, share, startWith, switchMap, filter } from 'rxjs/operators';*/


import { Component, OnInit } from '@angular/core';

import { Observable, interval, fromEvent, asyncScheduler } from 'rxjs';
import { takeWhile, tap, map, buffer, filter, debounce, withLatestFrom, throttleTime} from 'rxjs/operators';


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit{

  startTime = new Date(0, 0, 0, 0, 0, 30);
  currentTime = new Date();
  timer$: Observable<any>;
  clicks$: Observable<any>;
  timerOnGoing;
  isStarted;
  isReset;
  constructor() {}

  ngOnInit() {
    this.setCurrentTime();
    this.timer$ = this.createTimer(this.startTime);
  }
  createTimer(startTime) {
    return interval(1000);
  }

  getTimer(event) {
    this.startTime = new Date(0, 0, 0, event.hh, event.mm, event.ss);
    this.setCurrentTime();
  }
  startStop() {
    // toggle start/stop
    if (this.isReset) {
      this.isReset = false;
      this.setCurrentTime();
    }
    this.isStarted ? this.stop() : this.start();
  }
  start() {
    this.isStarted = true;
    this.timerOnGoing = this.timer$
      // stop timer if it's gone
      .pipe(takeWhile(data => this.isTimerStopped(this.currentTime)))
      // set start time after timer is gone
      .pipe(
        tap({
          complete: () => {
            this.setCurrentTime();
            this.isStarted = false;
          }
        })
      )
      // decrease time
      .pipe(
        map(() => {
          this.currentTime.setSeconds(this.currentTime.getSeconds() - 1);
        })
      )
      .subscribe(() => {});
  }
  stop() {
    this.isStarted = false;
    this.setCurrentTime();
    if (this.timerOnGoing) {
      this.timerOnGoing.unsubscribe();
    }
  }

  reset() {
    this.isStarted = false;
    this.isReset = true;
    this.currentTime.setHours(0);
    this.currentTime.setMinutes(0);
    this.currentTime.setSeconds(0);
    if (this.timerOnGoing) {
      this.timerOnGoing.unsubscribe();
    }
  }
  wait() {

    const throttleConfig = {
  leading: false,
  trailing: true
}

   this.clicks$ = fromEvent(document.getElementById("controls").querySelector("#wait"), 'click');
  

  const doubleClick = this.clicks$.pipe(
  throttleTime(300, asyncScheduler, throttleConfig)
);
 
doubleClick.subscribe((numclicks) => {
  document.getElementById("controls").querySelector('h2').innerText = ''+numclicks+' x click';
      if (this.timerOnGoing) {
      this.isStarted = false;
      this.timerOnGoing.unsubscribe();
    }
});   

   /*const multiClickStream$ = this.clicks$.pipe(buffer(() => { return this.clicks$.pipe(debounceTime(250)); })
    ,map((list) => { return list.length; })
    ,filter((x) => { return x >= 2; }));//debounceTime(300));





   const sub = multiClickStream$.subscribe((numclicks) => {
    document.getElementById("controls").querySelector('h2').innerText = ''+numclicks+' x click';
  });*/


  //const result = this.clicks$.pipe(debounceTime(1000));
  //result.subscribe(x => console.log(x));

  }



  isTimerStopped(time: Date) {
    return time.getHours() + time.getMinutes() + time.getSeconds() !== 0;
  }
  setCurrentTime() {
    this.currentTime.setHours(this.startTime.getHours());
    this.currentTime.setMinutes(this.startTime.getMinutes());
    this.currentTime.setSeconds(this.startTime.getSeconds());
  }

  addZeroBefore(n) {
    return (n < 10 ? '0' : '') + n;
  }

}
/*import { Component, OnInit, NgModule } from '@angular/core';
import { Subscription,interval } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit{



  name = 'Angular';
  maxSecond = 20;
  currentSecond = 0;
  timer: Subscription;
  constructor() {
    this.currentSecond = this.maxSecond;
  }

  start() {
    this.timer = interval(1000).subscribe(()=>{
      this.currentSecond--;
    });
  }
  stop() {
    // clearInterval(this.timer);
    this.timer.unsubscribe();
  }
  restart() {
    this.currentSecond = this.maxSecond;
      this.timer.unsubscribe();
  }

  ngOnInit(){

  }
}
*/



