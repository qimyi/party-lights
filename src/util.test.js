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
      expect(result[0]).to.eql(0x92);
      expect(result[1]).to.eql(0x49);
      expect(result[2]).to.eql(0x24);
      expect(result[3]).to.eql(0x92);
      expect(result[4]).to.eql(0x49);
      expect(result[5]).to.eql(0x24);
      expect(result[6]).to.eql(0xd2);
      expect(result[7]).to.eql(0x69);
      expect(result[8]).to.eql(0x36);
    });
  });

  describe('bufferToHex', () => {
    it('converts buffer data to a concatenated hex string', () => {
      const result = util.bufferToHex(Buffer.from('deadbeef', 'hex'));
      expect(result).to.equal('deadbeef');
    });
  });
});
