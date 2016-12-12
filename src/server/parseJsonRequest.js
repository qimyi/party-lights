export default (request, options = {}) => new Promise((res, rej) => {
  const bufferSize = 1024;
  const s = Buffer.alloc(bufferSize);
  let offset = 0;

  request.on('error', () => {
    rej(new Error('Unexpected error'));
  });

  request.on('data', data => {
    const stringData = data.toString();
    if (offset + stringData.length > bufferSize) {
      rej(new Error('Input data too long'));
    } else {
      s.write(stringData, offset);
      offset += stringData.length;
    }
  });

  request.on('end', () => {
    try {
      res(JSON.parse(s.toString().substr(0, offset)));
    } catch (e) {
      rej(new Error('Input data was not valid JSON'));
    }
  });
});
