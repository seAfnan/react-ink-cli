#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
		Usage
		  $ react-cli-app

		Options
			--name  Your name

		Examples
		  $ react-cli-app --name=Jane
		  Hello, Jane
	`,
	{
		importMeta: import.meta,
	},
);

// render(<App name={cli.flags.name} />);
render(<App />);
