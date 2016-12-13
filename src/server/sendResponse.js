export default (response, data = '', statusCode = 200) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }

  response.writeHead(statusCode, {
    'Content-Length': Buffer.byteLength(data),
    'Content-Type': 'application/json; charset=utf-8'
  });

  response.end(data);
};
