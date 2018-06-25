// Nodejs encryption of streams
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    // algorithm = 'aes-256-gcm',

    password = 'd6F3Efeq';

var fs = require('fs');
var zlib = require('zlib');
var iv = '60iP0h6vJoEa';


// input file
var r = fs.createReadStream('readFromFile.txt');
// zip content
var zip = zlib.createGzip();
// encrypt content
var encrypt = crypto.createCipher(algorithm, password);
// decrypt content
var decrypt = crypto.createDecipher(algorithm, password)
// unzip content
var unzip = zlib.createGunzip();
// write file
var w = fs.createWriteStream('writeToFile.txt');

// encrypted content
r.pipe(encrypt).pipe(decrypt).pipe(w);

// decrypted and unzipted content
r.pipe(zip).pipe(encrypt).pipe(decrypt).pipe(unzip).pipe(w);


