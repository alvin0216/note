// setTimeout(() => {
//   console.log('setTimeout');
// });

// Promise.resolve(1)
//   .then(() => {
//     console.log(2);
//   })
//   .then(() => {
//     console.log(3);
//   });

let a = 3;
total = 0;

function func(a) {
  let result = [];
  for (var i = 0; i < 3; i++) {
    result[i] = function () {
      total += i * a;
      console.log(total);
    };
  }
  return result;
}

const bb = func(1);
bb[0]();
bb[1]();
bb[2]();

// 你了解过
