import {parseColor} from './colorUtil';

export default class LED {
  constructor() {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
  }

  setRGB(r, g, b) {
    if (
      r > 255 || r < 0 ||
      g > 255 || g < 0 ||
      b > 255 || b < 0
    ) throw new Error('Color out of range', [r, g, b]);

    this.red = r;
    this.green = g;
    this.blue = b;
  }

  setRGBfromHex(hex) {
    const color = parseColor(hex);
    this.setRGB(...color);
  }

  setRGBfromArray(color) {
    this.setRGB(...color);
  }
}
