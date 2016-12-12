// Import the interface to Tessel hardware
import tessel from 'tessel';
import {randomColor, hsl2rgb, scaleLuminosity} from './colorUtil';
import Strand from './Strand';

const portA = tessel.port['A'];
const spi = new portA.SPI({
  clockSpeed: 2400000 // 4MHz
});

// Turn one of the LEDs on to start.
tessel.led[2].on();

const redGreen = (t) => 60 * (1 + Math.sin(0.628318531 * t));
const satWave = (t) => (1 + Math.sin(t * Math.PI / 10))/2;

let t = 0;
const getColor = () => {
  const rgb = hsl2rgb([
    t=(t+10)%360,
    1,
    0.5
  ]);

  return rgb;
};

// Blink!

const strand = new Strand(24);
let v = 1;
let x = 0;

strand.setLEDColor(0, [255, 0, 0]);
setInterval(function () {
  strand.update(spi);
  if (x + v > strand.nLED - 1) v = -1;
  else if (x + v < 0) v = 1;

  x += v;
  if (v > 0) strand.shiftRight();
  else if (v < 0) strand.shiftLeft();
}, 20);
