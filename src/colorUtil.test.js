import {roundFloat} from './util';
import * as colorUtil from './colorUtil';

const COLOR_INDEX = ['red', 'green', 'blue'];

describe('colorUtil', () => {
  it('parses `#xxxxxx` formatted strings', () => {
    expect(colorUtil.parseColor('#009623')).to.eql([0, 150, 35]);
  });

  it('parses `xxxxxx` formatted strings', () => {
    expect(colorUtil.parseColor('ffb400')).to.eql([255, 180, 0]);
  });

  it('converts rgb array to grbInteger value', () => {
    expect(colorUtil.rgb2grbInt([0, 150, 35])).to.eql(0x960023);
  });

  it('converts rgb array to hsl array', () => {
    const raw = colorUtil.rgb2hsl([0, 150, 35]);
    const rounded = [
      raw[0],
      roundFloat(raw[1], 2),
      roundFloat(raw[2], 2)
    ];
    expect(rounded).to.eql([134, 1.0, 0.29]);
  });

  it('converts hsl array to rgb array', () => {
    const threshold = 1;
    const expected = [0, 150, 35];
    const result = colorUtil.hsl2rgb(colorUtil.rgb2hsl([0, 150, 35]));
    result.forEach((c, i) => {
      expect(Math.abs(c - expected[i]), `${COLOR_INDEX[i]} difference is at most ${threshold}`)
        .to.be.at.most(threshold);
    });
  });
});
