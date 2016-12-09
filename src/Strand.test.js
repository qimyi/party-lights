import Strand from './Strand';

describe.only('Strand', () => {
  it('should initialize a strand of LEDs', () => {
    const strand = new Strand(5);

    expect(strand.LEDs).to.have.lengthOf(5);
  });

  it('should send LED colors down the SPI', () => {
    const strand = new Strand();

    const mockSpi = {
      transfer: sinon.stub()
    };

    strand.update(mockSpi);

    expect(mockSpi.transfer).to.have.been.calledOnce;
  });
});
