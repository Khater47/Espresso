'use strict';

const express = require('express');
const router = express.Router();

router.get('/user', async (req, res) => {
	try {
		const msg = 'Welcome to Espresso';
		return res.status(200).json(msg);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
