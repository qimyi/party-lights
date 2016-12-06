import * as colorUtil from './colorUtil';

describe('colorUtil', () => {
  describe('parseColor', () => {
    it('parses `#xxxxxx` formatted strings', () => {
      expect(colorUtil.parseColor('#009623')).to.eql([0, 150, 35]);
    });

    it('parses `xxxxxx` formatted strings', () => {
      expect(colorUtil.parseColor('ffb400')).to.eql([255, 180, 0]);
    });
  });

  describe('rgb2grbInt', () => {
    it('converts rgb array to grbInteger value', () => {
      expect(colorUtil.rgb2grbInt([0, 150, 35])).to.eql(0x960023);
    });
  });
});
