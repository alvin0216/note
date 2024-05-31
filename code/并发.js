const map = new Map();
const runMap = new Map();
const list = [];

const eMap = new Map();
class Event {
  constructor() {}

  on(type, fn) {
    const list = eMap.get(type) || [];
    eMap.set(type, [...list, fn]);
  }

  emit(type, ...args) {
    const list = eMap.get(type) || [];
    list.forEach((fn) => fn?.(...args));
  }
}

class Request {
  constructor() {
    this.loading = false;
    this.data = undefined;
    this.error = undefined;
    this.cacheKey = undefined;
    this.event = new Event();
    this.event.on('suceess', ({ cacheKey, data }) => {
      if (this.cacheKey === undefined || this.cacheKey !== cacheKey || this.loading) return;
      this.loading = false;
      this.data = data;
    });

    this.event.on('error', ({ cacheKey, error }) => {
      if (this.cacheKey === undefined || this.cacheKey !== cacheKey || this.loading) return;
      this.loading = false;
      this.error = error;
    });
  }

  // cacheKey is request
  async run(fn, opts = {}) {
    const { cacheKey } = opts;
    this.cacheKey = cacheKey;
    if (map.has(cacheKey)) this.data = map.get(cacheKey);
    else {
      try {
        this.loading = true;
        if (runMap.get(cacheKey)) return;
        runMap.set(cacheKey, 1);
        this.data = await fn();
        this.loading = false;
        map.set(cacheKey, this.data);
        // notice all the list
        this.event.emit('suceess', { cacheKey, data: this.data });
      } catch (e) {
        this.error = e;
        this.event.emit('suceess', { cacheKey, error: this.error });
      }
    }
  }
}

const req = new Request();
function getName() {
  console.log('run get name');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

function test(count) {
  req.run(getName, { cacheKey: 'a' });
  console.log(count, req.loading, req.data);
  setTimeout(() => {
    console.log(count, req.loading, req.data);
  }, 3000);
}
test(1);
test(2);
test(3);
