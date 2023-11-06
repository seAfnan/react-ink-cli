const express = require('express');
const router = express.Router();

const openFileExplorer = require('open-file-explorer');
const path = require('path');
const os = require('os');
const fs = require('fs');

// Define the path where you want the file dialog to start
const initialPath = os.homedir();

// Define the options for the file dialog
const options = {
	title: 'Select a CSV file',
	defaultPath: initialPath,
	filters: [
		{name: 'CSV Files', extensions: ['csv']},
		// Add more filter options if needed
	],
};

// Open the file explorer dialog
openFileExplorer(options, filePath => {
	if (filePath) {
		const fileExtension = path.extname(filePath);
		if (fileExtension === '.csv') {
			console.log(`Selected CSV file: ${filePath}`);
		} else {
			console.log('Please select a CSV file.');
		}
	} else {
		console.log('File selection was canceled.');
	}
});

router.get('/openexplorer', (req, res) => {
	require('child_process').exec('start "" "c:\\"');
	// openFileExplorer();
	res.status(200).send('Api passed');
});

module.exports = router;
