import { of, map, from, first, timer, concatMap, take, interval, fromEvent, takeUntil } from 'rxjs';

// of(1, 2, 3)
//   .pipe(map((x) => x * x))
//   .subscribe((v) => console.log(`value: ${v}`)); // 1 4 9

// from([1, 2, 3])
//   .pipe(map((x) => x * x))
//   .subscribe((v) => console.log(`value: ${v}`)); // 1 4 9

// of(1, 2, 3)
//   .pipe(first())
//   .subscribe((v) => console.log(`value: ${v}`)); // value: 1

// timer(0, 1000).subscribe(console.log); // 一直发
// timer(0, 1000).pipe(take(4)).subscribe(console.log);

const source = interval(1000);
const clicks = fromEvent(document, 'click');
const result = source.pipe(takeUntil(clicks));
result.subscribe((x) => console.log(x));

// This could be any observable
// const source = of(1, 2, 3);

// timer(3000)
//   .pipe(concatMap(() => source))
//   .subscribe(console.log);
