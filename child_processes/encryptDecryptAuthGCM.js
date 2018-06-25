const fs = require('fs');
const crypto = require('crypto');
const algorythm = 'aes-256-gcm';
// const algorythm = 'aes-256-cbc';

const key = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
// iv is fixed
// const iv = '60iP0h6vJoEa';
// iv to be random
const IV_LENGTH = 16;



function encrypt(text) {

    var iv = crypto.randomBytes(IV_LENGTH);
    var cipher = crypto.createCipheriv(algorythm, key, iv);
    var encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    var tag = cipher.getAuthTag();

    return {
        content: encrypted,
        tag: tag,
        iv: iv
    }
}

// encrypt is the encrypted object
function decrypt(encrypted) {

    var iv = encrypted.iv;
    var decipher = crypto.createDecipheriv(algorythm, key, iv);
    decipher.setAuthTag(encrypted.tag);
    var decrypt = decipher.update(encrypted.content, 'hex', 'utf8');
    decrypt += decipher.final('utf8');

    return decrypt;
}

var text = '';
var encryptedData = null;

function writeEncryptedFile() {

    fs.readFile('./readFromFile.txt', (err, data) => {
        if (err) {
            throw err;
        }
        encryptedData = encrypt(data);
        console.log(data)
        fs.writeFile('./writeToFile.txt', encryptedData.content, (er) => {
            if (er instanceof Error)
                throw er;
        })
    });
}

function readAndDecryptEncryptedFile(encrypted) {

    fs.readFile('./writeToFile.txt', (err, data) => {
        if (err) {
            throw err;
        }
        encryptedData = {content: data, tag: encrypted.tag};
        console.log('data',data);
        

    });
}
var text = "hello from Auth encrypting"
console.log('1 encr=', encrypt(text));
console.log('encrypted',decrypt(encrypt(text)));

console.log('2 encr=',encrypt(text));
console.log('encrypted',decrypt(encrypt(text)));

console.log(decrypt(encrypt(text)));
console.log('encrypted',encryptedData)

// writeEncryptedFile();
//  readAndDecryptEncryptedFile(encryptedData);