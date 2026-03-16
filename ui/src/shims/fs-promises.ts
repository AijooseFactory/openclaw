const noop = () => Promise.resolve();
export const access = noop;
export const readFile = () => Promise.resolve('');
export const writeFile = noop;
export const mkdir = noop;
export const stat = () => Promise.resolve({ isDirectory: () => true, size: 0 });
const fsPromises = { access, readFile, writeFile, mkdir, stat };
export default fsPromises;
