import sendResponse from './sendResponse';

describe('sendResponse', () => {
  let response;

  beforeEach(() => {
    response = {
      writeHead: sinon.stub(),
      end: sinon.stub()
    };
  });

  it('sends object data as JSON', () => {
    sendResponse(response, {foo: "bar"});

    const expectedContent = '{"foo":"bar"}';

    expect(response.writeHead).to.have.been.calledOnce;
    expect(response.writeHead.lastCall.args[0]).to.eql(200);
    expect(response.writeHead.lastCall.args[1]).to.eql({
      'Content-Length': expectedContent.length,
      'Content-Type': 'application/json; charset=utf-8'
    });

    expect(response.end).to.have.been.calledOnce;
    expect(response.end.lastCall.args[0]).to.eql(expectedContent);
  });

  it('sends a response with a status code', () => {
    sendResponse(response, {error: 'Not found'}, 404);

    const expectedContent = '{"error":"Not found"}';

    expect(response.writeHead).to.have.been.calledOnce;
    expect(response.writeHead.lastCall.args[0]).to.eql(404);
    expect(response.writeHead.lastCall.args[1]).to.eql({
      'Content-Length': expectedContent.length,
      'Content-Type': 'application/json; charset=utf-8'
    });

    expect(response.end).to.have.been.calledOnce;
    expect(response.end.lastCall.args[0]).to.eql(expectedContent);
  });

  it('sends string data directly', () => {
    sendResponse(response, 'foo');

    expect(response.writeHead).to.have.been.calledOnce;
    expect(response.writeHead.lastCall.args[0]).to.eql(200);
    expect(response.writeHead.lastCall.args[1]).to.eql({
      'Content-Length': 3,
      'Content-Type': 'application/json; charset=utf-8'
    });

    expect(response.end).to.have.been.calledOnce;
    expect(response.end.lastCall.args[0]).to.eql('foo');
  });
});
