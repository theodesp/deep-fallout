const Code = require('code');   // assertion library
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const deepFallout = require('../src/index');

lab.experiment('Converts simple types', () => {

  lab.test('Converts number literals to Objects', (done) => {

    expect(deepFallout(1, (val) => val)).to.equal(Object(1));
    expect(deepFallout(1.1, (val) => val)).to.equal(Object(1.1));
    expect(deepFallout({}, (val) => val)).to.equal(Object({}));
    expect(deepFallout([], (val) => val)).to.equal(Object([]));

    done();
  });

  lab.test('Applies the callback to the actual object', (done) => {
    expect(deepFallout(1, (val) => Object(val+1))).to.equal(Object(2));
    expect(deepFallout({}, (val) => Object.freeze(val))).to.satisfy(function (val) { return Object.isFrozen(val); });

    done();
  });

  lab.test('Applies the callback to the object properties but only if they are objects', (done) => {
    function callBackForNumbers(val) {
      'use strict';
      if (Number.isInteger(val)) {
        val += 1;
      }

      return val;
    }

    function callBackForObjects(val) {
      'use strict';
      if (Object.isExtensible(val)) {
        val = Object.preventExtensions(val);
      }

      return val;
    }
    expect(deepFallout({x:1, y: 2, z: {}}, (val) => callBackForNumbers(val))).to.satisfy(function (val) { return val["x"] == 1 && val["y"] == 2; });
    expect(deepFallout({x:{z:{}}, y: {w: {}}}, (val) => callBackForObjects(val))).to.satisfy(function (val) {
      return !Object.isExtensible(val["x"])
          && !Object.isExtensible(val["y"])
          && !Object.isExtensible(val["x"]["z"])
          && !Object.isExtensible(val["y"]["w"]);
    });

    done();
  });
});
