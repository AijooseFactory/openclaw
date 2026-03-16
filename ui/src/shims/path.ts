const noop = () => {};
export const resolve = (...args) => args.filter(Boolean).join('/').replace(/\/+/g, '/');
export const join = (...args) => args.filter(Boolean).join('/').replace(/\/+/g, '/');
export const dirname = (p) => p.split('/').slice(0, -1).join('/') || '.';
export const basename = (p) => p.split('/').pop() || '';
export const extname = (p) => {
  const base = p.split('/').pop() || '';
  const dotIndex = base.lastIndexOf('.');
  return dotIndex === -1 ? '' : base.slice(dotIndex);
};
export const relative = (from, to) => to;
export const isAbsolute = (p) => p.startsWith('/');
export const sep = '/';
export const delimiter = ':';
const path = { resolve, join, dirname, basename, extname, relative, isAbsolute, sep, delimiter };
export default path;
