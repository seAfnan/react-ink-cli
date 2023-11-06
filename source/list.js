import React from 'react';
import {Text} from 'ink';

export default function List() {
	return (
		<Text>
			<Text color="green">Available commands:</Text>
			{'\n'}• Help: Show available commands
			{'\n'}• About: Display information about this CLI
			{'\n'}• fetch-price [pair]: Fetch the current price of a specified
			cryptocurrency
			{'\n'}• upload: Opens the file explorer to allow uploading csv files only.
			{'\n'}• draw [file] [columns]: Draws the chart of the specified columns of
			the file present in the draw-chart directory.
			{'\n'}• delete [file]: To delete a file
		</Text>
	);
}
