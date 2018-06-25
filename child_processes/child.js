//this is the child process
process.on('message', (m) => {
    console.log('CHILD got message:', m);
    process.send({ m });
  });
// process.send({ foo: 'bar' });