const b = () => {
  try {
    async function async1() {
      console.log(1);
      await async2();
      console.log(2);
    }
    //
    async function async2() {
      console.log(3);
    }
    async1();
    new Promise(function (resolve, reject) {
      reject(8);
      console.log(4);
    }).then(() => {
      console.log(6);
    });
    console.log(7);
  } catch (error) {
    console.log(error);
  }
};
b();
