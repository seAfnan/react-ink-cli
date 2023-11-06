import React from 'react';
import {Text} from 'ink';

export default function List() {
	return (
		<Text color="green">
			CLI {process.version}
			{'\n'}
			<Text color="blue">
				This is a front-end CLI created as a part of the Full Stack Hiring test.
				It simulates various command-line functionalities.
			</Text>
		</Text>
	);
}
