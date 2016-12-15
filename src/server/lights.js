// Import the interface to Tessel hardware
import tessel from 'tessel';
import {scaleLuminosity, parseColor} from '../colorUtil';
import Strand from '../Strand';

let color = '#ff0000';
let isInitalised = false;
const getColor = () => parseColor(color);

const initTessel = () => {
  const portA = tessel.port['A'];
  const spi = new portA.SPI({
    clockSpeed: 2400000 // 4MHz
  });

  // Turn one of the LEDs on to start.
  tessel.led[2].on();

  return spi;
};

const initProgram = (spi) => {
  const strand = new Strand(24);

  let t = 0;
  setInterval(function () {
    t = (t + 1) % 10;
    const l = (1 + Math.sin(t * Math.PI / 5))/5;
    const c = scaleLuminosity(getColor(), l);

    for (let i = 0; i < strand.nLED; i++) {
      strand.setLEDColor(i, c);
    }
    strand.update(spi);
  }, 20);
};

export default {
  setColor(newColor) {
    color = newColor;
  },

  init() {
    if (isInitalised) return;

    let spi;
    try {
      spi = initTessel();
    } catch (e) {
      console.error('Could not init tessel! Restart');
      return false;
    }

    initProgram(spi);
    isInitalised = true;

    console.log('Lights initialised');
  }
};
