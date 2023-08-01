'use strict';

const express = require('express');
const router = express.Router();

const userDao = require('../daos/userDao');

const loggedUserId = userDao.loggedUserId;

router.get('/users/all', async (req, res) => {
	try {
		const users = await userDao.getAllUsers();
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.get('/users/:userId', async (req, res) => {
	try {
		const user = await userDao.getUserById(req.params.userId);
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.get('/users/:userId/friends', async (req, res) => {
	try {
		const friends = await userDao.getUserFriends(req.params.userId);
		res.status(200).json(friends);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.get('/my-friends', async (req, res) => {
	try {
		const friends = await userDao.getUserFriends(loggedUserId);
		res.status(200).json(friends);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.post('/user/add-trend', async (req, res) => {
	try {
		const userTrends = await userDao.getUserTrends(loggedUserId);
		if (!userTrends.trends) {
			await userDao.modifyTrends(req.body.trend_id, loggedUserId);
			return res.status(201).json({msg: 'Trend added'});
		} else {
			const trendsIds = userTrends.trends.split('|');
			if (trendsIds.includes(req.body.trend_id))
				return res.status(200).json({msg: 'Already added'});
			const updated = [userTrends.trends, req.body.trend_id].join('|');
			await userDao.modifyTrends(updated, loggedUserId);
			return res.status(201).json({msg: 'Trend added'});
		}
	} catch (err) {
		console.log(err);
		res.status(503).json({error: 'Error adding trend as priority'});
	}
});

router.post('/user/remove-trend', async (req, res) => {
	try {
		const userTrends = await userDao.getUserTrends(loggedUserId);
		if (!userTrends.trends) return res.status(200).end();

		const trendsIds = userTrends.trends.split('|');

		if (trendsIds.includes(req.body.trend_id)) {
			const index = trendsIds.indexOf(req.body.trend_id);
			trendsIds.splice(index, 1);
			const updated = [...trendsIds].join('|');
			await userDao.modifyTrends(updated, loggedUserId);
			return res.status(201).json({msg: 'Trend deleted'});
		} else {
			return res.status(200).json({msg: 'Trend was not a priority'});
		}
	} catch (err) {
		console.log(err);
		res.status(503).json({error: 'Error adding trend as priority'});
	}
});

router.put('/users/:userId/block-trend/:trend_id', async (req, res) => {
	try {
		const data = await userDao.getUserBlockedTrends(req.params.userId);
		let blocked_trends = [];
		if (data.blocked_trends !== null) {
			blocked_trends = data.blocked_trends.split('|');
		}
		if (blocked_trends.find(id => id === req.params.trend_id) === undefined) {
			await userDao.blockTrend(req.params.trend_id, req.params.userId);
		}
		res.status(200).end();
	} catch (err) {
		console.log(err);
		res.status(503).json({error: 'Server Error'});
	}
});

router.put('/users/:userId/unblock-trend/:trend_id', async (req, res) => {
	try {
		await userDao.unblockTrend(req.params.trend_id, req.params.userId);
		res.status(200).end();
	} catch (err) {
		console.log(err);
		res.status(503).json({error: 'Server Error'});
	}
});

module.exports = router;
