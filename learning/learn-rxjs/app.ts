import { Observable, Subject, BehaviorSubject } from 'rxjs';

function demo1() {
  let instance = new Observable((subscriber) => {
    console.log('hello Rxjs');
    // 发布
    subscriber.next(1);
    subscriber.next(2);
    subscriber.complete();
  });

  // 会执行 4 次 Observable 构造函数，输出 hello Rxjs
  instance.subscribe();
  instance.subscribe();
  instance.subscribe();
  instance.subscribe();
}

function demo2() {
  let instance = new Observable((subscriber) => {
    console.log('hello Rxjs');
    // 发布
    subscriber.next(1);
    subscriber.next(2);
    subscriber.complete();
  });

  instance.subscribe({
    complete: () => {
      console.log('complete');
    },
    next: (v) => {
      console.log('next', v);
    },
  });
  // hello Rxjs
  // next 1
  // next 2
  // complete
}

function demo3() {
  // Subject 用于创建可观察的对象，在订阅后不会立即执行
  // next 方法可以在观察对象外部调用
  let instance = new Subject();

  instance.subscribe((value) => console.log('value', value));
  instance.subscribe((value) => console.log('value', value));

  instance.next(1);
  instance.subscribe((value) => console.log('不会执行', value));
  // value 1
  // value 1
}

function demo4() {
  // BehaviorSubject 拥有 Subject 全部功能，但是在创建 BehaviorSubject 的时候需传入默认值，观察者订阅后可以拿到默认值
  let instance = new BehaviorSubject('默认值');

  instance.subscribe((value) => console.log('value', value));
  instance.subscribe((value) => console.log('value', value));

  instance.next('hello');
  // value 默认值
  // value 默认值
  // value hello
  // value hello
}
