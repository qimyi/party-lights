# Party Lights

Tinkering with Tessel

Includes:

* Driver
* Play code

** Driver
The WS-2812 LEDs are RGB LEDs that are chainable. The colour is set by pulsing the hexadecimal value 
of each of the prime colours into the DATA pin of the LED following the signalling scheme as
describe here<link>

This signalling scheme is achieved by utilising the SPI port of the Tessel 2 board. Referring to the 
datasheet of WS-2812, we can imagine that each bit of the RGB value is represented by 3 bits of 
data (let's call it a symbol), and each symbol always start with a HIGH and always ends with a LOW,
while center bit is either HIGH or LOW depending on the bit value that symbol is representing

The symbol rate is 8kHz and so, the bitrate is 2.4MHz. Each colour in an LED is represented by an 
8-bit value (1 byte). 3 colours = 3 bytes. But each data bit is sandwiched between 2 boundary bits.
 So the total number of bytes required to represent 1 LED is 9 bytes.
 
The purpose of the driver is to translate an array of RGB values to a bit stream as specified 
by the datasheet to be sent down to a strand of interconnected LEDs.

The following APIs are provided

const strand = new Strand(N); // creates a strand of N connected LEDs

strand.setLEDColor(i, colorHexString); // set the color of the i-th LED

strand.update(spi); // update the strand of LED connected to port `spi`

