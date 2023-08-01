'use strict';

const express = require('express');
const router = express.Router();

const dayjs = require('dayjs');

const loggedUserId = 1;

const npostDao = require('../daos/npostDao');
const userDao = require('../daos/userDao');

router.get('/normal-posts/all', async (req, res) => {
	try {
		const posts = await npostDao.getAllPosts();
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.get('/normal-posts/post/:postId', async (req, res) => {
	try {
		const post = await npostDao.getPostById(req.params.postId);
		res.status(200).json(post);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.get('/normal-posts/my-posts', async (req, res) => {
	try {
		const posts = await npostDao.getPostByUser(loggedUserId);
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.get('/normal-posts/friends-feed', async (req, res) => {
	try {
		const friendsString = await userDao.getUserFriends(loggedUserId);
		const friends = friendsString.friends.split('|').map(i => Number(i));
		let posts = [];
		for (let i of friends) {
			posts.push(...(await npostDao.getPostByUser(i)));
		}
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.post('/normal-posts/new-post', async (req, res) => {
	try {
		await npostDao.createNormalPost(
			loggedUserId,
			req.body.textual_input,
			req.body.media_location,
			dayjs(),
			req.body.life_event,
			req.body.nshared_id,
			req.body.sshared_id
		);
		return res.status(201).json({msg: 'Created Successfully'});
	} catch (err) {
		console.log(err);
		res.status(503).json({error: 'Error Creating post in the database!'});
	}
});

router.delete('/normal-posts/post/:postId', async (req, res) => {
	try {
		await npostDao.deleteNormalPost(req.params.postId);
		return res.status(204).end();
	} catch (err) {
		console.log(err);
		return res.status(503).end();
	}
});

router.put('/normal-posts/post/:postId', async (req, res) => {
	try {
		await npostDao.editNormalPost(
			req.params.postId,
			req.body.textual_input,
			req.body.media_location,
			req.body.creation_date,
			req.body.life_event
		);
		return res.status(201).json({msg: 'Edited Successfully'});
	} catch (err) {
		console.log(err);
		res.status(503).json({error: 'Error Editing post in the database!'});
	}
});

module.exports = router;
