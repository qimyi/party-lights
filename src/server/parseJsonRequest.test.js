import {EventEmitter} from 'events';
import parseJsonRequest from './parseJsonRequest';

describe('parseJsonRequest', () => {
  let request;

  beforeEach(() => {
    request = new EventEmitter();
  });

  it('parses valid JSON', async () => {
    const promise = parseJsonRequest(request);

    request.emit('data', '{"foo": "bar"}');
    request.emit('end');

    const json = await expect(promise).to.be.fulfilled;
    expect(json).to.eql({foo: 'bar'});
  });

  it('parses request data in parts', async () => {
    const promise = parseJsonRequest(request);
    const parts = [
      '{"foo":',
      '"bar"',
      '}'
    ];

    parts.forEach(p => request.emit('data', p));
    request.emit('end');

    const json = await expect(promise).to.be.fulfilled;
    expect(json).to.eql({foo: 'bar'});
  });

  it('rejects when there are errors', async () => {
    const promise = parseJsonRequest(request);

    request.emit('error');

    const error = await expect(promise).to.be.rejected;
    expect(error.message).to.eql('Unexpected error');
  });

  it('rejects when the request exceeds the buffer length', async () => {
    const bufferLength = 1024;
    const start = '{"foo":"';
    const end = '"}';
    const middle = Array.from({
      length: bufferLength - start.length - end.length + 1
    }, () => 'x').join('');
    const content = [start, middle, end].join('');

    const promise = parseJsonRequest(request);
    request.emit('data', content);
    request.emit('end');

    const error = await expect(promise).to.be.rejected;
    expect(error.message).to.eql('Input data too long');
  });
});
