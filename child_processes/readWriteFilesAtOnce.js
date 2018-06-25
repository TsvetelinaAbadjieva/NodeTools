//test for fork and streams

const fs = require('fs');
const cp = require('child_process');
const path = require('path');


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

// writableStream.write(chunker);

readableStream.on('data', function (chunk) {

    data += chunk;
        n.send({ data: data });
        writableStream.write(data);
        // readableStream.pipe(writeableStream);
})
.on('end', function(){
    console.log('Stream is consumed!')
})

n.on('message', (data) => {
    console.log(`PARENT got new message:`, data);
});
