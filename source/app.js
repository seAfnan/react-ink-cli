import List from './list.js';
import About from './about.js';
import axios from 'axios';
import React, {useState, useRef, useEffect, forwardRef} from 'react';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
import chalk from 'chalk';

const url = 'https://api.binance.com/api/v3/avgPrice?symbol=';
const apiUrl = 'http://localhost:3100/';

export default function App() {
	const [inputValue, setInputValue] = useState('');

	function errorMsg(error) {
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
	}

	function cryptoPrice(command) {
		command = command.toUpperCase();
		console.log('');
		axios
			.get(url + command)
			.then(response => {
				console.log(
					chalk.blue('The current price of ') +
						chalk.green(command.toUpperCase()) +
						' is $' +
						chalk.blue(parseFloat(response.data.price).toFixed(2)),
				);
				console.log('');
			})
			.catch(error => {
				errorMsg(error);
				console.log('');
			});
	}

	function openFileExplorer() {
		axios
			.get(apiUrl + 'api/file/openexplorer')
			.then(response => {
				console.log('Please select CSV file');
			})
			.catch(error => {
				errorMsg(error);
			});
	}

	const handleSubmit = query => {
		// let checkName = query.toLowerCase().replace(/ /g, '');
		let checkName = query.toLowerCase();
		let currency = '';
		if (checkName.includes('fetch-price')) {
			const [pre, post] = checkName.split(' ');
			checkName = pre;
			currency = post;
		}

		setInputValue('');
		console.log(chalk.blue(checkName));
		console.log('');

		switch (checkName) {
			case 'help':
				return console.log(`
Available commands:
• Help: Show available commands
• About: Display information about this CLI
• fetch-price [pair]: Fetch the current price of a specified cryptocurrency
• upload: Opens the file explorer to allow uploading csv files only.
• draw [file] [columns]: Draws the chart of the specified columns of the file present in the draw-chart directory.
• delete [file]: To delete a file
				`);
			case 'about':
				return console.log(
					chalk.blue(
						'CLI',
						process.version,
						chalk.green(
							'This is a front-end CLI created as a part of the Full Stack Hiring test. It simulates various command-line functionalities.',
						),
					),
				);
			case 'fetch-price':
				return cryptoPrice(currency);
			case 'upload':
				return '';
			default:
				return '';
		}
	};

	return (
		<Box>
			<Box marginRight={1}>
				<Text>$</Text>
			</Box>
			<TextInput
				placeholder="Please type command"
				onSubmit={handleSubmit}
				value={inputValue}
				onChange={value => setInputValue(value)}
				highlightPastedText={true}
			/>
		</Box>
	);
}
