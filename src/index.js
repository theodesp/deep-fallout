const utils = require("./utils");

const getOwnPropertyNames = Object.getOwnPropertyNames;
/**
 * Facade call over the deepFalloutNoInvariant or deepFalloutWithInvariant methods
 * @param obj
 * @param callBack
 * @param callBackInvariant [Optional] Used to check if at each property we can or not apply the callback.
 * It needs to return true if we allow the callback to be applied or false if we not allow the callback to be applied
 * @returns {Object}
 */
function deepFallout(obj, callBack, callBackInvariant) {
  'use strict';
  const target = utils.asObject(obj);

  if (callBackInvariant) {
    return deepFalloutWithInvariant(target, callBack, callBackInvariant);
  } else {
    return deepFalloutNoInvariant(target, callBack, callBackInvariant);
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


function deepFalloutWithInvariant(target, callBack, callBackInvariant) {
  'use strict';
  if (callBackInvariant(target)) {
    target = callBack(target);

    getOwnPropertyNames(target).forEach(function (prop) {
      if (target.hasOwnProperty(prop) && target[prop] !== null && utils.isObj(target[prop])) {
        deepFalloutNoInvariant(target[prop], callBack, callBackInvariant)
      }
    });
  }

  return target;
}
/**
 * A partial application for the deepFallout.
 * Returns a function that expects an obj to be passed applying the callbacks deeply.
 * @param callBack
 * @param callBackInvariant
 * @returns {Function}
 */
function makeDeep(callBack, callBackInvariant) {
  'use strict';
  return function (obj) {
    return deepFallout(obj, callBack, callBackInvariant);
  }
}

module.exports = deepFallout;
module.exports.makeDeep = makeDeep;
