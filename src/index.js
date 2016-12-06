// Import the interface to Tessel hardware
import tessel from 'tessel';
import {parseColor, rgb2grbInt, randomColor} from './colorUtil';

const portA = tessel.port['A'];
const spi = new portA.SPI({
  clockSpeed: 2400000 // 4MHz
});

// Turn one of the LEDs on to start.
tessel.led[2].on();

const PREAMBLE = Buffer.alloc(9);
const POSTAMBLE = Buffer.alloc(16);

function convertData (input) {
  const binary = input.toString(2).split('');
  const padLength = 24 - binary.length;
  const fullWidthBinary = Array.from({length: padLength}, () => '0').concat(binary);
  const transformedBinary = `1${fullWidthBinary.join('01')}0`;

  let outHex = '';
  for (let i = 0; i < 9; i++) {
    outHex = outHex + parseInt(transformedBinary.slice(i*8, (i+1)*8), 2).toString(16);
  }

  return Buffer.from(outHex, 'hex');
}

function transmitData (hexColor) {
  const data = (hexColor instanceof Array) ? hexColor : [hexColor];
  const dataArray = [PREAMBLE].concat(data.map(convertData)).concat([POSTAMBLE]);
  const bufferLength = 9 + 16 + 9 * data.length;
  spi.transfer((Buffer.concat(dataArray, bufferLength)), function (error, dataReceived) {
    //console.log('buffer returned by SPI slave:', dataReceived);
  });
}

// Blink!
// var color = 0;
setInterval(function () {
  const elizabeth = rgb2grbInt(parseColor('#009623'));

  // transmitData(g * 0x10000 + r * 0x100 + b);
  transmitData([
    rgb2grbInt(randomColor()),
    elizabeth,
    rgb2grbInt(randomColor()),
    elizabeth,
    rgb2grbInt(randomColor()),
    elizabeth,
    rgb2grbInt(randomColor()),
    elizabeth,
    rgb2grbInt(randomColor()),
    elizabeth,
    rgb2grbInt(randomColor()),
    elizabeth,
    rgb2grbInt(randomColor()),
    elizabeth,
    rgb2grbInt(randomColor()),
    elizabeth
  ]);
}, 100);
