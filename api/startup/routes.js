const express = require('express');
const openexplorer = require('../routes/openexplorer');

module.exports = function (app) {
	app.use(express.json());
	app.use('/api/file', openexplorer);
};
