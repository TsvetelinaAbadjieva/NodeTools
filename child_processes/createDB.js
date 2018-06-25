const spawn = require('child_process').spawn;

const nodeModules = [
    // 'mkdir encryption',
    // 'cd app',
    // 'npm init',
    // 'npm install --save http',
    // 'npm install --save chunking-streams',
    // 'npm install --save crypto',
    // 'npm install --save nodemailer',
    // 'npm install --save mysql'
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

setupNodeModules(nodeModules);

const optionsDB = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'DB'
}
 const dbSettings = [
     `mysql -u ${optionsDB.user} -p ${optionsDB.password}`,
     `CREATE DATABASE IF NOT EXISTS ${optionsDB.database};`,
     'SHOW DATABASES;',
     `USE  ${optionsDB.database};`,
     `GRANT ALL PRIVILEGES ON *.* TO ${optionsDB.user};`
 ];

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

// setupDB(dbSettings);

const mysql = require('mysql');
const con = mysql.createConnection(optionsDB);

var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');

 const key = fs.readFileSync('private.key');
 const cert = fs.readFileSync('host.crt');
//  const ca = fs.readFileSync('intermediate.crt');
  const options = {
      key: key,
      cert: cert,
    //   ca:ca
  }
//   app.get('/google.com', (er, req, res )=>{
//       if(er)
//       throw err;
//       res.send('app started');
//   })
 https.createServer(options, app, ()=>{
     console.log('app listen on 443')
 }).listen(443);