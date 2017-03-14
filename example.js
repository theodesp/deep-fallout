var deepFallout = require('./src/index');
var Buffer = {
  x: 5,
  z: 1,
  w: {y: 10}
};
deepFallout(Buffer, (obj) => Object.freeze(obj));
Buffer.x = 2;
console.log(Buffer.x);

Buffer.w.y = 5;
console.log(Buffer.w.y);

// Use of makeDeep
var objectFreezer = deepFallout.makeDeep((obj) => Object.freeze(obj));
var Icecube = {
  x: 0,
  z: 1,
  w: {y: 2}
};
objectFreezer(Icecube);
Icecube.x = 2;
console.log(Icecube.x);

Icecube.w.y = 5;
console.log(Icecube.w.y);


