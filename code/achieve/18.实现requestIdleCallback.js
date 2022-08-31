class RequestIdle {
  deadlineTime = null;
  callback = () => {};
  channel = null;
  port1 = null;
  port2 = null;
  isWaitingAvailableFrame = true;

  constructor() {
    this.channel = new MessageChannel();
    this.port1 = this.channel.port1;
    this.port2 = this.channel.port2;
    this.port2.onmessage = () => {
      const timeRemaining = () => this.deadlineTime - performance.now();
      const _timeRemain = timeRemaining();
      if (_timeRemain > 0 && this.callback && this.isWaitingAvailableFrame) {
        const deadline = {
          timeRemaining,
          didTimeout: _timeRemain < 0,
        };
        this.callback(deadline);
        this.isWaitingAvailableFrame = false;
      } else if (this.isWaitingAvailableFrame) {
        this.RequestIdleCallback(this.callback);
      }
    };
  }

  RequestIdleCallback = function (cb) {
    const SECONDE_DURATION = 1000;
    const FRAME_DURATION = SECONDE_DURATION / 60;
    this.callback = cb;
    this.isWaitingAvailableFrame = true;
    if (!document.hidden) {
      requestAnimationFrame((rafTime) => {
        this.deadlineTime = rafTime + FRAME_DURATION;
        this.port1.postMessage(null);
      });
    } else {
      this.deadlineTime = performance.now() + SECONDE_DURATION;
      this.port1.postMessage(null);
    }
  };
}

// ,,,,,
const idle = new RequestIdle();

idle.RequestIdleCallback(workLoop);

function workLoop(deadline) {
  console.log(`本帧剩余时间 ${parseInt(deadline.timeRemaining())}`);

  // 如果帧内有富余的时间，或者超时 则执行任务
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && works.length > 0) {
    console.log(33);
  }

  // 有未完成的任务 则重新调度
  if (works.length > 0) {
    idle.RequestIdleCallback(workLoop);
  }
}

function sleep(delay) {
  for (let start = Date.now(); Date.now() - start <= delay; ) {
    // ...
  }
}

const works = [
  () => {
    console.log('第一个任务开始');
    sleep(20);
    console.log('第一个任务结束');
  },
  () => {
    console.log('第二个任务开始');
    sleep(20);
    console.log('第二个任务结束');
  },
  () => {
    console.log('第三个任务开始');
    sleep(20);
    console.log('第三个任务结束');
  },
];
