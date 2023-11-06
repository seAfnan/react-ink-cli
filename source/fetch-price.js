// Add this line at the top to enable ES6 module support
import 'esm';
import axios from 'axios';
import chalk from 'chalk';

const url = 'https://api.binance.com/api/v3/avgPrice?symbol=';

// Access command-line arguments
const [nodePath, scriptPath, command, product] = process.argv;
let checkCommand = command.toLowerCase();
checkCommand = checkCommand.replace(/ /g, '');
axios
	.get(url + command)
	.then(response => {
		console.log(
			chalk.blue('The current price of ') +
				chalk.green(checkCommand.toUpperCase()) +
				' is $' +
				chalk.blue(parseFloat(response.data.price).toFixed(2)),
		);
	})
	.catch(error => {
		if (error.response) {
			// The request was made and the server responded with a status code
			const statusCode = error.response.status;
			const responseData = error.response.data;

			switch (statusCode) {
				case 400:
					console.error(
						chalk.blue(
							'Bad Request: The server could not understand the request.',
						),
					);
					break;
				case 401:
					console.error(
						chalk.red(
							'Unauthorized: Authentication is required, or the provided credentials are invalid.',
						),
					);
					break;
				case 403:
					console.error(
						chalk.blue(
							'Forbidden: Access to the requested resource is denied.',
						),
					);
					break;
				case 404:
					console.error(
						chalk.red(
							'Not Found: The requested resource could not be found on the server.',
						),
					);
					break;
				case 500:
					console.error(
						chalk.red(
							'Internal Server Error: An unexpected error occurred on the server.',
						),
					);
					break;
				default:
					console.error('Status Code:', statusCode);
					console.error('Response Data:', responseData);
					break;
			}
		} else if (error.request) {
			// The request was made but no response was received
			console.error('No Response Received');
		} else {
			// Something happened in setting up the request or other errors
			console.error('Request Error:', error.message);
		}
	});
