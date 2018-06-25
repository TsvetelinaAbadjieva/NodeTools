'use strict';

// this is algorythm for random generated encryption;

const crypto = require('crypto');

// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)
const ENCRYPTION_KEY = '3zTvzr3p67VC61jmV54rIYu1545x4TlY'; // Must be 256 bytes (32 characters)

const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {

 let iv = crypto.randomBytes(IV_LENGTH);
 let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
 let encrypted = cipher.update(text);

 encrypted = Buffer.concat([encrypted, cipher.final()]);

 return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {

 let textParts = text.split(':');
 let iv = new Buffer(textParts.shift(), 'hex');
 let encryptedText = new Buffer(textParts.join(':'), 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
 let decrypted = decipher.update(encryptedText);

 decrypted = Buffer.concat([decrypted, decipher.final()]);

 return decrypted.toString();
}

console.log(ENCRYPTION_KEY);
var encr1 = encrypt("Hello world");
var encr2 = encrypt("Hello world");

console.log(encr1);
console.log(decrypt(encrypt(encr1)));
console.log(decrypt(encr1));
console.log('/n')
console.log(encr2);
console.log(decrypt(encrypt(encr2)));
console.log(decrypt(encr2));

module.exports = { decrypt, encrypt };