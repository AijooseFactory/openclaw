export const homedir = () => '/';
export const tmpdir = () => '/tmp';
export const platform = () => 'browser';
export const release = () => '1.0.0';
export const type = () => 'Browser';
export const endianness = () => 'LE';
const os = { homedir, tmpdir, platform, release, type, endianness };
export default os;
