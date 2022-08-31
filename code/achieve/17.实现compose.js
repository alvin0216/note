function compose(...funcs) {
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

function a() {
  console.log('a');
}

function b() {
  console.log('b');
}

let fn = compose(a, b);

fn();
