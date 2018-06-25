//Using OpenSSl
//commands:
//# Make keys for Bob
// mkdir -p ./bob
// openssl genrsa -out ./bob/privkey.pem 2048
// openssl rsa -in ./bob/privkey.pem -pubout -out ./bob/pubkey.pem

// # Make keys for Alice
// mkdir -p ./alice
// openssl genrsa -out ./alice/privkey.pem 2048
// openssl rsa -in ./alice/privkey.pem -pubout -out ./alice/pubkey.pem

//using Node.js
//npm install -- bluebird
//npm install --ursa

//generate file with content
//echo "Hello, Alice!" > ./msg.txt

var rsa = require('ursa');
var path = require('path');
var PromiseA = require('bluebird').Promise;
var fs = PromiseA.promisifyAll(require('fs'));
var mkdirp = PromiseA.promisify(require('mkdirp'));

function keypairgen(pathname) {

    //generate private and public keys for 
    var key = rsa.generatePrivateKey(1024, 65537);
    var privateKeyPem = key.toPrivatePem();
    var publicKeyPem = key.toPublicPem();

    //construct file names and paths to the files will be generated    
    var privateKeyPath = path.join(pathname, "privateKey.pem");
    var publicKeyPath = path.join(pathname, "publicKey.pem");

    return mkdirp(pathname).then(function () {

        return PromiseA.all([
            fs.writeFileAsync(privateKeyPath, privateKeyPem, 'ascii'),
            fs.writeFileAsync(publicKeyPath, publicKeyPem, 'ascii')
        ]);
    }).then(function(){
        return key;
    })
}

PromiseA.all([
    keypairgen('bob'),
    keypairgen('alice')
]).then(function(keys){
    console.log('Generated %d keypairs', keys.length)
})

var key = rsa.generatePrivateKey(1024, 65537);

// console.log(privateKeyPem);
// console.log(publicKeyPem)