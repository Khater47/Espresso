'use strict';

const db = require('../db');
const Trend = require('../modules/Trend');

exports.getAllTrends = () => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM trend';
		db.all(sql, [], (err, row) => {
			if (err) reject(err);
			else {
				resolve(row);
			}
		});
	});
};

exports.getTrendById = trend_id => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM trend WHERE trend_id = ?';
		db.get(sql, [trend_id], (err, row) => {
			if (err) reject(err);
			else {
				resolve(row);
			}
		});
	});
};
