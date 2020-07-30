// Challenge
// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html

const request = require('request');
const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];
const fs = require('fs');
const readline = require('readline');

//body is just actual content that's coming back
request(url, (error, response, body) => {
	// console.log(response);
	if (error) {
		console.log(error);
		return;
	}

	// check if the filepath already exists
	if (fs.existsSync(filePath)) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: 'Do you want to overwrite this file? Y or N ',
		});

		rl.prompt();

		rl.on('line', (line) => {
			switch (line.trim().toLowerCase()) {
				// stacking is possible
				case 'y':
				case 'Y':
					fs.writeFile(filePath, body, () => {
						fs.stat(filePath, (err, stats) => {
							if (err) {
								console.log(err);
							}
							// console.log(stats.size);
							console.log(
								`Downloaded and saved ${stats.size} bytes to ${filePath}`
							);
						});
					});
					break;
				default:
					console.log('file not saved');
					break;
			}
			// rl.prompt();
		}).on('close', () => {
			console.log('Have a great day!');
			process.exit(0);
		});
	}
});

// what is common practice for error and response as i'm not using it right now
// What should happen if the local file path given already exists? tip: readline module

// What should happen if the local file path given is invalid?
// -->
// fs.writeFile('message.txt', data, (err) => {
// 	if (err) throw err;
// 	console.log('The file has been saved!');
// });

// What should happen if the given URL results in an error or non-200 result?
// --> by default, any response not in 200 will throw an error
