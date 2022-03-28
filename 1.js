const interval = 1000;
let ms = 5000; // 从服务器和活动开始时间计算出的时间差，这里测试用 5000 ms
let count = 0;
const startTime = Date.now();
let timeCounter = setTimeout(countDownStart, interval);

function countDownStart() {
  count++;
  const offset = Date.now() - (startTime + count * interval); // A
  let nextTime = interval - offset;
  if (nextTime < 0) {
    nextTime = 0;
  }
  ms -= interval;
  console.log(`误差：${offset} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${ms} ms`);
  if (ms < 0) {
    clearTimeout(timeCounter);
  } else {
    timeCounter = setTimeout(countDownStart, nextTime);
  }
}
