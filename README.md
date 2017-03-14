# deep-fallout

Recursively applies a callback to object properties that are functions or objects.


# example

``` js
var deepFallout = require('deep-fallout');

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
```

***

```
$ node example/deep.js
5
10
```

# methods

``` js
var deepFallout = require('deep-fallout');
```

## deepFallout(obj, callback)

Apply `callback` recursively on all properties of `obj`  that are functions or objects.

## makeDeep(callback)

Return a function that accepts an `obj` that partially applies `callback` recursively on all properties of `obj`  that are functions or objects.
# tests
Use `yarn` or `npm` to run tests;

# license

MIT