# Muvor Protocol Secure (MVRPS)

## Description

A secure custom protocol implementation for Muvor Protocol Secure (MVRPS) using TLS.

## Installation

```bash
npm install mvrps
```

## Implementation 

### Client
```bash
const { secureRequest } = require('mvrps');

const options = {
  hostname: '127.0.0.1',
  port: 8443,
  method: 'CREATE',
  key: 'path/to/client-key.pem',
  cert: 'path/to/client-cert.pem',
  ca: 'path/to/ca-cert.pem'
};

const req = secureRequest(options, (res) => {
  res.on('data', (chunk) => {
    console.log(`Response: ${chunk}`);
  });
});

req.write('Hello, secure server!');
req.end();
```

### Server

```bash
const { createSecureServer } = require('mvrps');

const server = createSecureServer({
  key: 'path/to/server-key.pem',
  cert: 'path/to/server-cert.pem'
}, (req, res) => {
  res.write('Hello, MVRPS!');
  res.end();
});

server.listen(8443, '127.0.0.1', () => {
  console.log('MVRPS server listening on 127.0.0.1:8443');
});
```