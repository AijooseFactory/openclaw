const noop = () => {};
export const promisify = (fn) => fn;
export const inherits = noop;
export const inspect = (obj) => JSON.stringify(obj);
const util = { promisify, inherits, inspect };
export default util;
