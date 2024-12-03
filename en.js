const fs = require('fs');
const { Transform } = require('stream');

 

const encryptStream = new Transform({
  transform(chunk, encoding, callback) {
    const buffer = Buffer.from(chunk);

  
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = (buffer[i] + 10) % 256; 
    }

   
    this.push(buffer);
    callback();
  },
});

const inputFile = 'input.txt'; 
const outputFile = 'en.txt';
const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

readStream.pipe(encryptStream).pipe(writeStream);



