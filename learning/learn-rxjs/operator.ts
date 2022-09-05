// prettier-ignore
import { of, range, map, from, first, timer, concatMap, take, interval, fromEvent, takeUntil, takeWhile ,switchMap, throttleTime } from 'rxjs';

function demo1() {
  range(0, 5).subscribe((x) => console.log(x)); // 0 1 2 3 4

  interval(1000)
    .pipe(map((n) => n * 2))
    .subscribe((x) => console.log(x)); // 0 2 4 6 8 10 ....

  of(1, 2, 3)
    .pipe(map((x) => x * x))
    .subscribe((v) => console.log(`value: ${v}`)); // 1 4 9

  from([1, 2, 3])
    .pipe(map((x) => x * x))
    .subscribe((v) => console.log(`value: ${v}`)); // 1 4 9

  const button = document.querySelector('#btn') as Element;

  fromEvent(button, 'click')
    .pipe(map((e) => e.target))
    .subscribe(console.log);

  fromEvent(button, 'click')
    .pipe(switchMap((e) => interval(1000)))
    .subscribe(console.log);

  range(0, 5)
    .pipe(take(2))
    .subscribe((x) => console.log(x)); // 0 1

  range(0, 5)
    .pipe(takeWhile((x) => x < 3))
    .subscribe((x) => console.log(x)); // 0 1 2

  // takeUntil 接受可观察对象，当可观察对象发出值得时候，终止主数据源
  fromEvent(document, 'mousemove')
    .pipe(takeUntil(fromEvent(button, 'click')))
    .subscribe(console.log);

  fromEvent(button, 'click').pipe(throttleTime(2000)).subscribe(console.log);
}

const button = document.querySelector('#btn') as Element;

fromEvent(button, 'click').pipe(throttleTime(2000)).subscribe(console.log);
