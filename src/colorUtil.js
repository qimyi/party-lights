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


const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;

  let result;
  if (t < 1 / 6) result = p + (q - p) * 6 * t;
  else if (t < 1 / 2) result = q;
  else if (t < 2 / 3) result = p + (q - p) * (2 / 3 - t) * 6;
  else result = p;

  return Math.round(result * 255);
};

export const hsl2rgb = ([h, s, l]) => {
  if (s === 0) {
    const x = Math.round(255 * l);
    return [x, x, x];
  }

  const q = (l < 0.5)
    ? l * (1 + s)
    : l + s - l * s;
  const p = 2 * l - q;

  const hr = (h % 360) / 360;
  return [
    hue2rgb(p, q, hr + 1 / 3),
    hue2rgb(p, q, hr),
    hue2rgb(p, q, hr - 1 / 3),
  ];
};

export const scaleLuminosity = (rgb, ratio) => {
  const [h, s, l] = rgb2hsl(rgb);
  const newRgb = hsl2rgb([h, s, l*ratio]);
  return newRgb;
};
