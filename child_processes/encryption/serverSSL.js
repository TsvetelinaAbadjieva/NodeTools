// Here is a simplified version that removes the passphrase, ups the security to suppress warnings and includes a suggestion in comments to pass in -subj to remove the full question list:

// openssl genrsa -out server.key 2048
// openssl rsa -in server.key -out server.key
// openssl req -sha256 -new -key server.key -out server.csr -subj '/CN=localhost'
// openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
// Replace 'localhost' with whatever domain you require. You will need to run the first two commands one by one as openssl will prompt for a passphrase.

// To combine the two into a .pem file:

// cat server.crt server.key > cert.pem

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),
  passphrase: '1234',

  // This is necessary only if using the client certificate authentication.
  requestCert: true,
  rejectUnauthorized: true,

  // This is necessary only if the client uses the self-signed certificate.
  ca: [fs.readFileSync('client-cert.pem')]
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);