const tls = require('tls');
const { MVRPRequest, MVRPResponse } = require('mvrp');

class MVRPSRequest extends MVRPRequest {
  constructor(socket) {
    super(socket);
  }
}

class MVRPSResponse extends MVRPResponse {
  constructor(socket) {
    super(socket);
  }
}

function createSecureServer(options, requestListener) {
  const server = tls.createServer(options, (socket) => {
    socket.on('data', (data) => {
      const req = new MVRPSRequest(socket);
      req.parseRequest(data);
      const res = new MVRPSResponse(socket);
      requestListener(req, res);
    });
  });

  return server;
}

function secureRequest(options, callback) {
  const clientOptions = {
    host: options.hostname,
    port: options.port,
    method: options.method,
    key: options.key,
    cert: options.cert,
    ca: options.ca,
    rejectUnauthorized: true
  };

  const client = tls.connect(clientOptions, () => {
    const req = `MVRP/1.0 ${options.method} ${options.path || '/'}\r\n\r\n${options.body || ''}`;
    client.write(req);
  });

  client.on('data', (data) => {
    const res = new MVRPSRequest(client);
    res.parseRequest(data);
    callback(res);
  });

  return client;
}

module.exports = { createSecureServer, secureRequest };
