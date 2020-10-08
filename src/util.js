export function pick(object, keys) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}

export function uniqueArrayByKey(arr, key) {
  return arr.filter((el, index, self) => {
    return index === self.findIndex((s) => (s[key] === el[key]));
  });
}