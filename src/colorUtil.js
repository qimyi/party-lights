export const parseColor = (input) => {
  return input.match(/[a-z0-9]{2}/ig).map(h => parseInt(h, 16));
};

export const rgb2grbInt = (input) => input[1] * 0x10000 + input[0] * 0x100 + input[2];

export const randomColor = () => [
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255)
];

export const rgb2hsl = ([r, g, b]) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const sigma = max + min;

  let h;
  if (delta === 0) h = 0;
  else {
    const dx = 60 / delta;
    if (max === r) h = dx * (g - b) % 360;
    else if (max === g) h = dx * (b - r) + 120;
    else if (max === b) h = dx * (r - g) + 240;
  }

  const l = sigma / 512;
  const s = l < 0.5 ? delta / sigma : delta / (2 - sigma);

  return [h, s, l];
};


const emu = s => s < 0 ? s + 1 : (s > 1 ? s - 1 : s);
const kangaroo = (t1, t2, c) => {
  if (6 * c < 1) return t2 + (t1 - t2) * 6 * c;
  if (2 * c < 1) return t1;
  if (3 * c < 2) return t2 + (t1 - t2) * (2 / 3 - 6 * c) * 6;
  return t2;
};

export const hsl2rgb = ([h, s, l]) => {
  const t1 = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const t2 = 2 * l - t1;
  const hue = h / 360;

  return [
    Math.round(255 * kangaroo(t1, t2, emu(hue + 1 / 3))),
    Math.round(255 * kangaroo(t1, t2, hue)),
    Math.round(255 * kangaroo(t1, t2, emu(hue - 1 / 3)))
  ];
};
