import LED from './LED';

describe('LED', () => {
  it('should initialise with black (all values zero)', () => {
    const led = new LED();

    expect(led.red).to.eql(0);
    expect(led.green).to.eql(0);
    expect(led.blue).to.eql(0);
  });

  it('should set the rgb values', () => {
    const led = new LED();

    led.setRGB(20, 40, 60);

    expect(led.red).to.eql(20);
    expect(led.green).to.eql(40);
    expect(led.blue).to.eql(60);
  });

  it('should set rgb values from hex string', () => {
    const led = new LED();

    led.setRGBfromHex('14283c');

    expect(led.red).to.eql(20);
    expect(led.green).to.eql(40);
    expect(led.blue).to.eql(60);
  });
});