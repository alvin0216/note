async function test() {
  console.log('Hello');
  await sleep(1000);
  console.log('world!');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test();
