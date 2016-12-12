import {EventEmitter} from 'events';
import parseJsonRequest from './parseJsonRequest';

describe('parseJsonRequest', () => {
  let request;

  beforeEach(() => {
    request = new EventEmitter();
  });

  it('parses valid JSON', async () => {
    const x = parseJsonRequest(request);

    request.emit('data', '{"foo": "bar"}');
    request.emit('end');

    const json = await expect(x).to.be.fulfilled;
    expect(json).to.eql({foo: 'bar'});
  });
});
