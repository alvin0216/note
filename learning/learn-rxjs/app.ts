import { Observable, Subject, BehaviorSubject } from 'rxjs';

function fn1() {
  let instance = new Observable((subscriber) => {
    // 发布
    subscriber.next(1);
    subscriber.next(2);
    subscriber.complete();
  });

  // 订阅
  instance.subscribe({
    complete: () => {
      console.log('你好');
    },
    next: (v) => {
      console.log('next', v);
    },
  });
}

function fn2() {
  // Subject 继承于 Observable 输出结果 fn2 hello two
  let instance = new Subject();

  instance.next('hello one');
  instance.subscribe((result) => {
    console.log('fn2', result);
  });
  instance.next('hello two');
}

function fn3() {
  let instance = new BehaviorSubject('hello world');
  instance.subscribe((result) => {
    console.log('订阅1', result);
  });

  instance.next('hello world >>> 2');

  instance.subscribe((result) => {
    console.log('订阅2', result);
  });

  // 每次订阅取得都是最新的值

  // 订阅1 hello world
  // app.ts:37 订阅1 hello world >>> 2
  // app.ts:43 订阅2 hello world >>> 2
}

// fn1();
// fn2();
// fn3();
