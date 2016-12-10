import Strand from './Strand';

describe.only('Strand', () => {
  it('should initialize a strand of LEDs', () => {
    const strand = new Strand(5);

    expect(strand.LEDs).to.have.lengthOf(5);
  });

  it('should send LED colors down the SPI', () => {
    const strand = new Strand(5);

    const mockSpi = {
      transfer: sinon.stub()
    };

    strand.update(mockSpi);

    expect(mockSpi.transfer).to.have.been.calledOnce;
  });

  it('should shift all leds to the right', () => {
    const strand = new Strand(6);

    strand.setLEDColor(0, '#ff0000');
    strand.shiftRight();

    expect(strand.LEDs).to.have.lengthOf(6);
    expect(strand.LEDs[0].red).to.eql(0);
    expect(strand.LEDs[1].red).to.eql(255);
    expect(strand.LEDs[2].red).to.eql(0);

    strand.shiftRight();
    expect(strand.LEDs[0].red).to.eql(0);
    expect(strand.LEDs[1].red).to.eql(0);
    expect(strand.LEDs[2].red).to.eql(255);

  });
});
