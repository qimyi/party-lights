// Import the interface to Tessel hardware
var tessel = require('tessel');
var pin = tessel.port.B.pin[7];

// sampling frequency 
var fs = 1000;
var Ts = 1000/f; // ms

var f = 10;

var sineT = function(t) {
  return Math.sin(2*Math.PI*f*t/1000) / 2 + 0.5;
};

setInterval(function() {
  // var v = sineT(Date.now());
  pin.analogWrite(sineT(Date.now()));
}, Ts);