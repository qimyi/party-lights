// Import the interface to Tessel hardware
var tessel = require('tessel');

var portA = tessel.port['A'];
var spi = new portA.SPI({
  clockSpeed: 2400000 // 4MHz
});

// Turn one of the LEDs on to start.
tessel.led[2].on();



var PREAMBLE = Buffer.alloc(9);
var POSTAMBLE = Buffer.alloc(16);
var bufferLength = 34;


var convertData = function(input) {

	var binary = input.toString(2).split('');
	var padLength = 24 - binary.length;

	var fullWidthBinary = Array.from({length: padLength}, () => '0').concat(binary);



var transformedBinary = `1${fullWidthBinary.join('01')}0`;

var outHex = '';
	for (var i=0; i < 9; i++) {
		outHex = outHex + parseInt(transformedBinary.slice(i*8, (i+1)*8), 2).toString(16);
	}

	return Buffer.from(outHex, 'hex');

}

var transmitData = function(hexColor) {
	var data = (hexColor instanceof Array) ? hexColor : [hexColor];
	var dataArray = [PREAMBLE].concat(data.map(convertData)).concat([POSTAMBLE]);
	var bufferLength = 9 + 16 + 9 * data.length;
	spi.transfer((Buffer.concat(dataArray, bufferLength)), function (error, dataReceived) {
	  //console.log('buffer returned by SPI slave:', dataReceived);
	});
};



// Blink!
// var color = 0;
setInterval(function () {
  var color = Math.floor((Math.random()*16777215));
  var luminosity = 0.20;
  var elizabeth = 0
    + Math.round(0x00 * luminosity) * 0x100
    + Math.round(0x96 * luminosity) * 0x10000
    + Math.round(0x23 * luminosity);

    
  // transmitData(g * 0x10000 + r * 0x100 + b);
  transmitData([
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)), 
    Math.floor((Math.random()*16777215)) 
  ]);
}, 100);