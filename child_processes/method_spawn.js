const cp = require('child_process');
const path = require('path');
const spawn = cp.spawn;
const exec = cp.exec;

//sudo apt-get xdotool download progma for open new console window using this command in the commandline: xdotool key ctrl+shift+t

// test for usage of exec, which doesn't allow allow args, they will be typed in the command string, but callback could be used
const commands = ['xdotool key ctrl+shift+t', 'mkdir app', 'cd app', ' touch index.js', 'npm init', 'npm install ', 'npm install --save http'];
args = ['', 'newFolder', 'newFolder', ''];

function setUpByExec(commands) {

    for (var i = 0; i < commands.length; i++) {
        var command = commands[i];

        exec(command, function (e, stdout, stderr) {
            if (e instanceof Error) {
                console.log('Inn error', e)
                throw e;
            }
            console.log('stdout: ', stdout);
            console.log('stderr:', stderr)
        })
    }
}

// setUpByExec(commands);

//spawn command allows usage of args, but no callback
commandsSpawn = [
    'mkdir app',
    'cd app',
    'touch index.js',
    'npm init ',
    'npm install --save http',
    'npm install --save chunking-streams',
    'npm install --save crypto',
    'npm install -- save nodemailer',
    'npm install -- save mysql'
];
// args = [
//     ['newFolder'],
//     ['newFolder'],
//     ['index.js'],
//     [''],
//     ['--save http']
// ];
options = [];

function setUpBySpawn(commands) {
    for (var i = 0; i < commands.length; i++) {
        var child = spawn(commands[i], { shell: true });

        child.stderr.on('data', function (er) {
            console.error('Error occured:', er.toString());
            throw (er);
        })
        child.stdout.on('data', function (data) {
            console.log('STDOUT data:', data.toString());
        })
        child.on('exit', function (code) {
            console.log('EXIT: ', code);
        })
    }
}
setUpBySpawn(commandsSpawn, args);


//test for fork and streams

const fs = require('fs');

const readableStream = fs.createReadStream('readFromFile.txt');
const writableStream = fs.createWriteStream('writeToFile.txt');
const chunkingStreams = require('chunking-streams');
const SizeChunker = chunkingStreams.SizeChunker;

const chunker = new SizeChunker({
    chunkSize: 1024,
    flushTail: true // flush or not remainder of an incoming stream. Defaults to false 
});
var output = fs.createWriteStream('writeToFile.txt');

var dataLength = 0;
var counter = -1;
var data;

readableStream.setEncoding('utf-8');

//test fork similar to child process but open independent streams and has additional communication channel for message transmition between parent and child

const n = cp.fork(`${__dirname}/child.js`);

//Using file chunkers there is 3 listeners 'chunkStart' callback(id, done), 'chunkEnd' callback(id, done), 'data'

chunker.on('chunkStart', function (id, done) {
    output = fs.createWriteStream('writeToFile.txt', {flags: 'a'});
    done();
});

chunker.on('chunkEnd', function (id, done) {
    output.end();
    done();
    n.send({ id: id, data: output.data });
});

chunker.on('data', function (chunk) {
    console.log(chunk);
    output.write(chunk.data);
});

readableStream.pipe(chunker);

// writableStream.write(chunker);

// readableStream.on('data', function (chunk) {

//     dataLength += chunk.length;
//     data += chunk;
//     if (dataLength > 10) {
//         counter ++;
//         n.send({ count: counter, data: data });
//         writableStream.write(data);
//         writableStream.write('================='+count)
//         // readableStream.pipe(writeableStream);
//     }

// })
// .on('end', function(){
//     console.log('Stream is consumed!')
// })

n.on('message', (data) => {
    console.log(`PARENT got new message:`, data);
});

