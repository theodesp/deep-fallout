const utils = require("./utils");

const getOwnPropertyNames = Object.getOwnPropertyNames;
/**
 * Facade call over the deepFalloutNoInvariant or deepFalloutWithInvariant methods
 * @param obj
 * @param callBack
 * @param invariant [Optional] Used to check if at each property we can or not apply the callback.
 * It needs to return true if we allow the callback to be applied or false if we not allow the callback to be applied
 * @returns {Object}
 */
function deepFallout(obj, callBack, invariant) {
  'use strict';
  const target = utils.asObject(obj);

  if (invariant) {
    return deepFalloutWithInvariant(target, callBack, invariant);
  } else {
    return deepFalloutNoInvariant(target, callBack);
  }
}

function deepFalloutNoInvariant(target, callBack) {
  'use strict';
  target = callBack(target);

  getOwnPropertyNames(target).forEach(function (prop) {
    if (target.hasOwnProperty(prop) && target[prop] !== null) {
      deepFalloutNoInvariant(target[prop], callBack)
    }
  });

  return target;
}


function deepFalloutWithInvariant(target, callBack, invariant) {
  'use strict';
  if (invariant(target)) {
    target = callBack(target);

    getOwnPropertyNames(target).forEach(function (prop) {
      if (target.hasOwnProperty(prop) && target[prop] !== null && utils.isObj(target[prop])) {
        deepFalloutNoInvariant(target[prop], callBack, invariant)
      }
    });
  }

  return target;
}
/**
 * A partial application for the deepFallout.
 * Returns a function that expects an obj to be passed applying the callbacks deeply.
 * @param callBack
 * @param invariant
 * @returns {Function}
 */
function makeDeep(callBack, invariant) {
  'use strict';
  return function (obj) {
    return deepFallout(obj, callBack, invariant);
  }
}

module.exports = deepFallout;
module.exports.makeDeep = makeDeep;
