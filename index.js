// Import the interface to Tessel hardware
var tessel = require('tessel');
var Promise = require('bluebird');

// PWM 
var f = 100;
var T = 1000/f; // ms
var D = 0.1;

tessel.led[3].off();

var turnOffWithDelay = function(t) {
	return Promise.delay(t)
		.then(() => {
			tessel.led[2].off();
		});
};

// Blink!
setInterval(function () {
	// Turn one of the LEDs on to start.
	tessel.led[2].on();
  turnOffWithDelay(Math.round(D * T));
}, T);

setInterval(function () {
	D = Math.max(D + 0.15, 1);
}, 2000);

console.log("I'm blinking! (Press CTRL + C to stop)");



// Promise.delay(3000)
// .then(() => {
// tessel.led[2].toggle();
// });

