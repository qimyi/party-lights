// Import the interface to Tessel hardware
import tessel from 'tessel';
import {randomColor} from './colorUtil';
import Strand from './Strand';

const portA = tessel.port['A'];
const spi = new portA.SPI({
  clockSpeed: 2400000 // 4MHz
});

// Turn one of the LEDs on to start.
tessel.led[2].on();

const strand = new Strand(24);
strand.setLEDColor(0, randomColor());

// Blink!
let counter = 0;
setInterval(function () {
  strand.update(spi);
  strand.shiftRight();
  counter++;
  if (counter % 4 === 0) {
    strand.setLEDColor(0, randomColor());
  }
}, 50);
