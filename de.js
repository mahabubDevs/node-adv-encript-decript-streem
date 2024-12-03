const fs = require('fs');
const { Transform } = require('stream');

// ডিক্রিপশন ট্রান্সফর্ম স্ট্রিম
const decryptStream = new Transform({
  transform(chunk, encoding, callback) {
    const buffer = Buffer.from(chunk);

    // প্রতিটি বাইট ডিক্রিপ্ট করা
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = (buffer[i] - 10 ) % 256; // 10 বিয়োগ করে ডিক্রিপ্ট করা
    }

    // পরিবর্তিত ডেটা পাস করা
    this.push(buffer);
    callback();
  },
});

// ফাইলের নাম
const encryptedFile = 'en.txt'; 
const decryptedFile = 'de.txt'; 


fs.createReadStream(encryptedFile)
  .pipe(decryptStream) 
  .pipe(fs.createWriteStream(decryptedFile)) 
  