'use strict';
var fs = require('fs');
var ursa = require('ursa');

var msg, sig, encr, rcv;

//// Bob has his private and Alice's public key
var privateKeyBob = ursa.createPrivateKey(fs.readFileSync('./bob/privateKey.pem'));
var publicKeyAlice = ursa.createPublicKey(fs.readFileSync('./alice/publicKey.pem'));

//// Alice has his private and Bob's public key
var privateKeyAlice = ursa.createPrivateKey(fs.readFileSync('./alice/privateKey.pem'));
var publicKeyBob = ursa.createPublicKey(fs.readFileSync('./bob/publicKey.pem'));

var msg = 'This is very secret message!';

// encryot content with Alice's public key but sign with Bob's private key encr and sign the ORIGINAL message
encr = publicKeyAlice.encrypt(msg, 'utf8', 'base64');
sig = privateKeyBob.hashAndSign('sha256', msg, 'utf8', 'base64');

console.log('encrypted = ', encr, '\n');
console.log('signed = ', sig, '\n');

rcv = privateKeyAlice.decrypt(encr, 'base64', 'utf8');
console.log(rcv);
if(msg != rcv){
    throw new Error('incorrect encryption');
}
rcv = new Buffer(rcv).toString('base64');
if(!publicKeyBob.hashAndVerify('sha256', rcv, sig, 'base64')){
    throw new Error('invalid signature');
}

console.log('After decryption', rcv);