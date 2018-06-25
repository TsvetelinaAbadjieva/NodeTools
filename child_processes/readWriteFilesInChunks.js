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

n.on('message', (data) => {
    console.log(`PARENT got new message:`, data);
});

readableStream.pipe(chunker);