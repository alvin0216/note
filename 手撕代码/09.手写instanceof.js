function myInstanceof(a, b) {
  let current = a.__proto__;
  let prototype = b.prototype;

  while (true) {
    if (current === prototype) return true;
    if (current === null) return false;
    current = current.__proto__;
  }
}

console.log(myInstanceof('aaaa', String));
console.log(myInstanceof(1, String));
console.log(myInstanceof([], Array));
