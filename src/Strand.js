import LED from './LED';
import {rgb2grbInt} from './colorUtil';
import {convertData} from './util';

const PREAMBLE = Buffer.alloc(9);
const POSTAMBLE = Buffer.alloc(16);

export default class Strand {
  constructor(n) {
    this.nLED = n;
    this.LEDs = Array.from({length: this.nLED}, () => new LED());
    this.bufferLength = 9 + 16 + 9 * this.nLED;
  }

  setLEDColor(index, color) {
    if (color instanceof Array) {
      this.LEDs[index].setRGBfromArray(color);
    } else if (typeof color === 'string') {
      this.LEDs[index].setRGBfromHex(color);
    }
  }

  //Todo
  // shift left/right
  shiftLeft() {
    this.LEDs.shift();
    this.LEDs.push(new LED());
  }

  shiftRight() {
    this.LEDs.pop();
    this.LEDs.unshift(new LED());
  }

  update(spi) {
    const data = this.LEDs.map(led => convertData(rgb2grbInt([led.red, led.green, led.blue])));

    const dataArray = [PREAMBLE].concat(data).concat([POSTAMBLE]);

    spi.send((Buffer.concat(dataArray, this.bufferLength)), function (error, dataReceived) {
      //console.log('buffer returned by SPI slave:', dataReceived);
    });
  }
}
