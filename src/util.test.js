import * as util from './util';

describe('util', () => {
  describe('zeroPadLeft', () => {
    it('zero-pads short strings', () => {
      expect(util.zeroPadLeft('1011', 8)).to.eql('00001011');
    });

    it('accepts strings which are much longer than pad size', () => {
      expect(util.zeroPadLeft('1011', 1)).to.eql('1011');
    });
  });

  describe('convertData', () => {
    it('converts a value to tessel buffer data', () => {
      const result = util.convertData(0x93);
      expect(result.toString('hex')).to.eql('924924924924d26936');
    });
  });
});
