// a instanceof Array

function myInstanceof(a, b) {
  let current = a.__proto__,
    prototype = b.prototype;

  while (true) {
    if (current === prototype) return true;
    if (current === null) return false;
    current = current.__proto__;
  }
}

console.log(myInstanceof('aaaa', String));
console.log(myInstanceof(1, String));
console.log(myInstanceof([], Array));

// better

function getType(target) {
  return Object.prototype.toString.call(target);
}

console.log(getType(1)); // [object Number]
console.log(getType([])); // [object Array]
console.log(getType(true)); // [object Boolean]
