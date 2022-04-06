// Comprobar si es un string
function isString(str) {
  return typeof str === "string";
}

// Comprobar si es un string vacío
function isEmptyString(str) {
  if (!isString(str)) return false;
  return str.length === 0;
}

// Comprobar si es un número
function isNumber(number) {
  return typeof number === "number";
}

// Comprobar si es un valor booleano
function isBoolean(data) {
  return typeof data === "boolean";
}

// Comprobar si es una función
function isFunction(func) {
  return typeof func === "function";
}

// Comprobar si es un arreglo
function isArray(array) {
  return Array.isArray(array);
}

// Comprobar si es un arreglo vacío
function isEmptyArray(array) {
  if (!isArray(array)) return false;
  return array.length === 0;
}

// Comprobar si es un valor verdadero
function isTrue(data) {
  return isBoolean(data) && data === true;
}

// Comprobar si es un valor falseo
function isFalse(data) {
  return isBoolean(data) && data === false;
}

// Comprobar si es un número
function isUndefined(data) {
  return typeof data === "undefined";
}

// Comprobar si es un objeto
function isObject(obj) {
  return typeof obj === "object";
}

// Comprobar si es un objeto vacío
function isEmptyObject(obj) {
  return obj && isObject(obj) && Object.keys(obj).length === 0;
}

// Comprobar si la longitud de un string es menor que el valor asignado
function isLessThan({ value, min }) {
  const validTypes = isString(value) || isArray(value);
  
  return validTypes && isNumber(min) && value.length < min;
}

// Comprobar si la longitud de un string es mayor que el valor asignado
function isGreaterThan({ value, max }) {
  return isString(value) && isNumber(max) && value.length > max;
}