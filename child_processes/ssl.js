const spawn = require('child_process').spawn;

const nodeModules = [
    // 'npm install --save http',
    // 'npm install express',
    // 'npm install https',

    // 'openssl req -new -newkey rsa:2048 -nodes -out domain.csr -keyout private.key'

    // 'openssl req -newkey rsa:2048 -nodes -keyout private.key -out domain.csr -subj "/C=BG/ST=Plovdiv/L=Plovdiv/CN=MyName/LN=Plovdiv/EA=c.abadjieva@code-nest.com" ',
    // 'openssl req -newkey rsa:2048 -nodes -keyout private.key -x509 -days 365 -out domain.crt ',
    // 'openssl req -key primary.key -new -x509 -days 365 -out domain.crt ',
    
    'openssl genrsa 1024 > private.key',
    'chmod 400 private.key',
    'openssl req -new -x509 -nodes -sha1 -days 365 -key private.key -out host.cert -subj "/C=BG/ST=Plovdiv/L=Plovdiv/CN=MyName/LN=Plovdiv/EA=c.abadjieva@code-nest.com"'
]
// openssl req -newkey rsa:2048 -nodes -keyout domain.key -out domain.csr 
// openssl req -key domain.key -new -out domain.csr 
// openssl req -newkey rsa:2048 -nodes -keyout domain.key -x509 -days 365 -out domain.crt 
//certificate signing request (CSR)
//CA certificate authority

function setupNodeModules(nodeModules) {
    nodeModules.forEach(module => {
        var child = spawn(module, { shell: true });
        child.stderr.on('data', function (er) {
            console.error('Error occured:', er.toString());
            throw (er);
        })
        child.stdout.on('data', function (data) {
            console.log(`Created module ${module}`, data.toString());
        })
        child.on('exit', function (code) {
            console.log('EXIT: ', code);
        })
    })
};

// setupNodeModules(nodeModules);


function setupDB(dbSettings){
    dbSettings.forEach(module => {
        var child = spawn(module, { shell: true });
        child.stderr.on('data', function (er) {
            console.error('Error occured:', er.toString());
            throw (er);
        })
        child.stdout.on('data', function (data) {
            console.log(`Executed ${module}`, data.toString());
        })
        child.on('exit', function (code) {
            console.log('EXIT: ', code);
        })
    })
}


var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');
var http = require('http');
var port = process.env.port || 3000
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const key = fs.readFileSync('host.key');
const cert = fs.readFileSync('host.cert');
//  const ca = fs.readFileSync('intermediate.crt');
var options = {
      key: key,
      cert: cert,
    //   ca:ca
  }

//   app.set(port);
  app.get('/', (req, res )=>{
    res.writeHead(200);
    res.end('app started');
  })
//   app.listen(port);
  http.createServer(app).listen(port);

//  https.createServer(options, app, (req, res)=>{
//     //  if(er) throw er;
//      res.writeHead(200);
//      res.end('Hello');
//      console.log('app listen on 443')
//  }).listen(443);

https.createServer(options, app, function(req, res){
    console.log('req', req);
    console.log('res', res);
}).listen(8000);