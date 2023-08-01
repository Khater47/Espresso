'use strict';

const db = require('../db');

exports.getAllPosts = () => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM normal_post';
		db.all(sql, [], (err, row) => {
			if (err) reject(err);
			else {
				resolve(row);
			}
		});
	});
};

exports.getPostById = npost_id => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM normal_post WHERE npost_id = ?';
		db.get(sql, [npost_id], (err, row) => {
			if (err) reject(err);
			else {
				resolve(row);
			}
		});
	});
};

exports.getPostByUser = author_id => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM normal_post WHERE author_id = ?';
		db.all(sql, [author_id], (err, row) => {
			if (err) reject(err);
			else {
				resolve(row);
			}
		});
	});
};

exports.createNormalPost = (
	author_id,
	textual_input,
	media_location,
	creation_date,
	life_event,
	nshared_id,
	sshared_id
) => {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO normal_post (author_id, textual_input, media_location, creation_date, life_event, nshared_id, sshared_id, isEdited)
        VALUES (?,?,?,?,?,?,?,?);`;
		db.run(
			sql,
			[
				author_id,
				textual_input,
				media_location,
				creation_date,
				life_event,
				nshared_id,
				sshared_id,
				0
			],
			(err, row) => {
				if (err) reject(err);
				else {
					resolve();
				}
			}
		);
	});
};

exports.deleteNormalPost = npost_id => {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM normal_post WHERE npost_id = ? ;`;
		db.run(sql, [npost_id], err => {
			if (err) reject(err);
			else resolve();
		});
	});
};

exports.editNormalPost = (npost_id, textual_input, media_location, creation_date, life_event) => {
	return new Promise((resolve, reject) => {
		const sql = `UPDATE normal_post SET textual_input = ?, media_location = ?, creation_date =?, life_event = ? , isEdited= ? WHERE npost_id =? ;`;
		db.run(sql, [textual_input, media_location, creation_date, life_event, 1, npost_id], err => {
			if (err) reject(err);
			else resolve();
		});
	});
};
