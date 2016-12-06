export const roundFloat = (f, d) => Number(Math.round(f + 'e' + d) + 'e-' + d);

export const zeroPadLeft = (s, n) => s.length < n
  ? Array(n - s.length + 1).join('0') + s
  : s;

const COLOR_CHANNEL_BITS = 8;
const COLOR_CHANNEL_COUNT = 3;
const COLOR_DEPTH = COLOR_CHANNEL_BITS * COLOR_CHANNEL_COUNT;
const LED_CHUNK_BIT_COUNT = 3;
const EIGHT_SPLIT_REGEXP = /.{8}/g;
export const convertData = (input) => {
  const fullWidthBinary = zeroPadLeft(input.toString(2), COLOR_DEPTH);
  const transformedBinary = `1${fullWidthBinary.split('').join('01')}0`;
  const buffer = Buffer.allocUnsafe(COLOR_DEPTH * LED_CHUNK_BIT_COUNT / COLOR_CHANNEL_BITS);
  transformedBinary
    .match(EIGHT_SPLIT_REGEXP)
    .forEach((s, i) => buffer.writeUInt8(parseInt(s, 2), i));
  return buffer;
};
