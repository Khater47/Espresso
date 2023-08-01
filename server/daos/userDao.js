'use strict';

const db = require('../db');

exports.loggedUserId = 1;

exports.getAllUsers = () => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM user_profile';
		db.all(sql, [], (err, row) => {
			if (err) reject(err);
			else {
				resolve(row);
			}
		});
	});
};

exports.getUserById = user_id => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM user_profile WHERE user_id = ?';
		db.get(sql, [user_id], (err, row) => {
			if (err) reject(err);
			else {
				resolve(row);
			}
		});
	});
};

exports.getUserTrends = user_id => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT trends FROM user_profile WHERE user_id = ?';
		db.get(sql, [user_id], (err, row) => {
			if (err) reject(err);
			else {
				resolve(row);
			}
		});
	});
};

exports.getUserBlockedTrends = user_id => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT blocked_trends FROM user_profile WHERE user_id = ?';
		db.get(sql, [user_id], (err, row) => {
			if (err) reject(err);
			else {
				resolve(row);
			}
		});
	});
};

exports.getUserFriends = user_id => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT friends FROM user_profile WHERE user_id = ?';
		db.get(sql, [user_id], (err, row) => {
			if (err) reject(err);
			else {
				resolve(row);
			}
		});
	});
};

exports.modifyTrends = (trends, user_id) => {
	return new Promise((resolve, reject) => {
		const sql = `UPDATE user_profile SET trends = ? WHERE user_id =? ;`;
		db.run(sql, [trends, user_id], err => {
			if (err) reject(err);
			else resolve();
		});
	});
};

exports.blockTrend = async (trend_id, user_id) => {
	let newBlockedTrends = '';
	await this.getUserBlockedTrends(user_id).then(oldBlockedTrends => {
		if (oldBlockedTrends.blocked_trends === null) {
			newBlockedTrends = `${trend_id}`;
		} else {
			newBlockedTrends = oldBlockedTrends.blocked_trends + `|${trend_id}`;
		}
	});
	return new Promise((resolve, reject) => {
		const sql = 'UPDATE user_profile SET blocked_trends = ? WHERE user_id = ?;';
		db.run(sql, [newBlockedTrends, user_id], err => {
			if (err) reject(err);
			else resolve();
		});
	});
};

exports.unblockTrend = async (trend_id, user_id) => {
	let newBlockedTrends = '';
	await this.getUserBlockedTrends(user_id)
		.then(oldBlockedTrends => {
			return oldBlockedTrends.blocked_trends.split('|');
		})
		.then(oldBlockedTrendsArray => {
			return oldBlockedTrendsArray.filter(id => id !== trend_id);
		})
		.then(newBlockedTrendsArray => {
			newBlockedTrends = newBlockedTrendsArray[0];
			for (let i = 1; i < newBlockedTrendsArray.length; i++) {
				newBlockedTrends = newBlockedTrends + '|' + newBlockedTrendsArray[i];
			}
		});
	return new Promise((resolve, reject) => {
		const sql = 'UPDATE user_profile SET blocked_trends = ? WHERE user_id = ?;';
		db.run(sql, [newBlockedTrends, user_id], err => {
			if (err) reject(err);
			else resolve();
		});
	});
};
