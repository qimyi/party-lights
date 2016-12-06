export const parseColor = (input) => {
  return input.match(/[a-z0-9]{2}/ig).map(h => parseInt(h, 16));
};

export const rgb2grbInt = (input) => input[1] * 0x10000 + input[0] * 0x100 + input[2];

export const randomColor = () => [
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255)
];
