function myAll(promises) {
  if (!Array.isArray(promises)) throw TypeError(`${promises} is not a array`);
  let len = promises.length;
  let result = new Array(len);
  let count = len;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      let prom = promises[i];
      // 判断是否是 promise
      if (prom instanceof Promise) {
        prom
          .then((res) => {
            result[i] = res;
            count--;
            if (count === 0) resolve(result);
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        count--;
        result[i] = prom;
      }
    }
  });
}

// Promise.all([1]).then((res) => {
//   console.log(res);
// });

let p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('run');
    resolve(1);
  }, 800);
});

let p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 300);
});

// myAll([p1, p2, 3]).then((res) => {
//   console.log(res);
// });

// Promise.all([p1, p2, 3]).then((res) => {
//   console.log(res);
// });

// race

function myRace(promises) {
  if (!Array.isArray(promises)) throw TypeError(`${promises} is not a array`);
  let len = promises.length;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      let prom = promises[i];
      // 判断是否是 promise
      if (prom instanceof Promise) {
        prom.then(resolve).catch((e) => {
          reject(e);
        });
      } else {
        resolve(prom);
        break;
      }
    }
  });
}

Promise.race([p1, 2]).then((res) => {
  console.log(res);
});

// todo 这里成功之后，其余的 promise 不会被执行的
myRace([p1, 2]).then((res) => {
  console.log(res);
});
