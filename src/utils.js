'use strict';
/**
 * Check if the param item is obj
 * @param val
 * @returns {boolean}
 */
function isObj(val) {
  var type = typeof val;

  return val !== null && (type === 'object' || type === 'function');
}

/**
 * Check if the param item is a Number obj
 * @param val
 * @returns {boolean}
 */
function isNumObj(val) {
  var type = typeof val;
  var constructor = val.constructor.name;

  return val !== null && type === 'object' && constructor === 'Number';
}

/**
 * Attempt to convert a param to object
 * @param val
 * @returns {Object}
 */
function asObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  return Object(val);
}


const utils = {
  isObj: isObj,
  isNumObj: isNumObj,
  asObject: asObject,
};

module.exports = utils;
