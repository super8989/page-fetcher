// Challenge
// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html

const request = require('request');
const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];
const fs = require('fs');

request(url, (error, response, body) => {
	fs.writeFile(filePath, body, () => {
		fs.stat(filePath, (err, stats) => {
			console.log(stats.size);
			console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
		});
	});

	// console.log('error', error);
	// console.log('statusCode:', response.statusCode);
	// console.log('body', body);
});

// have i made the right request
// how to search to get bytes from response -- am i getting the bytes info from the reponse
// what file am i writing
// where to search for Node's fs module
// how should i scan the documentation for information i need
