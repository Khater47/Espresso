'use strict';

const express = require('express');
const router = express.Router();

const trendDao = require('../daos/trendDao');
const userDao = require('../daos/userDao');

const loggedUserId = userDao.loggedUserId;

router.get('/trends/all', async (req, res) => {
	try {
		const trends = await trendDao.getAllTrends();
		const blockedString = await userDao.getUserBlockedTrends(loggedUserId);
		if (blockedString.blocked_trends) {
			const blockedIds = blockedString.blocked_trends.split('|').map(i => Number(i));
			const filterdtrends = trends.filter(trend => {
				return !blockedIds.includes(trend.trend_id);
			});
			return res.status(200).json(filterdtrends);
		} else res.status(200).json(trends);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.get('/trends/trend/:trend_id', async (req, res) => {
	try {
		const trend = await trendDao.getTrendById(req.params.trend_id);
		res.status(200).json(trend);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.get('/trends/my-trends', async (req, res) => {
	try {
		const trendString = await userDao.getUserTrends(loggedUserId);
		if (!trendString.trends) {
			return res.status(200).json([]);
		}
		const trendsIds = trendString.trends.split('|').map(i => Number(i));
		let trends = [];
		for (let i of trendsIds) {
			trends.push(await trendDao.getTrendById(i));
		}
		const blockedString = await userDao.getUserBlockedTrends(loggedUserId);
		if (blockedString.blocked_trends) {
			const blockedIds = blockedString.blocked_trends.split('|').map(i => Number(i));
			const filterdtrends = trends.filter(trend => {
				return !blockedIds.includes(trend.trend_id);
			});
			return res.status(200).json(filterdtrends);
		} else res.status(200).json(trends);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

router.get('/trends/my-blocked-trends', async (req, res) => {
	try {
		const trendString = await userDao.getUserBlockedTrends(loggedUserId);
		if (!trendString.blocked_trends) {
			return res.status(200).json([]);
		}
		const trendsIds = trendString.blocked_trends.split('|').map(i => Number(i));
		let trends = [];
		for (let i of trendsIds) {
			trends.push(await trendDao.getTrendById(i));
		}
		res.status(200).json(trends);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

module.exports = router;
