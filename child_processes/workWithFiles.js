const fs = require('fs');
const src = './readFromFile.txt';
const destination = 'copyOfReadFromFile.txt';

// fs.open(destination, 'a+', (er, destination) => {
//     if(er)
//     throw er;
//     fs.copyFile('./readFromFile.txt', './copyOfReadFromFile.txt', (e)=>{
//         if(e)
//         throw e;
//         console.log('File is copied to destination', destination)
//     })
// });

fs.copyFile('./readFromFile.txt', './copyOfReadFromFile.txt', (e)=>{
    if(e)
    throw e;
    console.log('File is copied to destination', destination)
})