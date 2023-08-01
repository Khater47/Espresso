const APIURL = new URL('http://localhost:3001/api/'); //local address here instead of localhost

// Trends helwa
const getAllTrends = async () => {
	let err = new Error();
	const response = await fetch(new URL(`trends/all`, APIURL), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (response.ok) {
		const trends = await response.json();
		return trends;
	} else {
		throw err;
	}
};

const getPriorityTrends = async () => {
	let err = new Error();
	const response = await fetch(new URL(`trends/my-trends`, APIURL), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (response.ok) {
		const priorityTrends = await response.json();
		return priorityTrends;
	} else {
		throw err;
	}
};
const getTrendById = async trend_id => {
	let err = new Error();
	const response = await fetch(new URL(`trends/trend/${trend_id}`, APIURL), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (response.ok) {
		const trend = await response.json();
		return trend;
	} else {
		throw err;
	}
};
const addPriorityTrend = async trend_id => {
	let err = new Error();
	let id_string = trend_id.toString();
	const id_object = {trend_id: id_string};
	const response = await fetch(new URL(`user/add-trend`, APIURL), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(id_object)
	});
	if (response.ok) {
		return;
	} else {
		throw err;
	}
};

const removePriorityTrend = async trend_id => {
	let err = new Error();
	let id_string = trend_id.toString();
	const id_object = {trend_id: id_string};
	const response = await fetch(new URL(`user/remove-trend`, APIURL), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(id_object)
	});
	if (response.ok) {
		return;
	} else {
		throw err;
	}
};

const getBlockedTrends = async () => {
	let err = new Error();
	const response = await fetch(new URL('trends/my-blocked-trends', APIURL), {
		method: 'GET',
		headers: {
			contentType: 'application/json'
		}
	});
	if (response.ok) {
		const blockedTrends = await response.json();
		return blockedTrends;
	} else {
		throw err;
	}
};

const blockTrend = async (trend_id, user_id) => {
	let err = new Error();
	const response = await fetch(new URL(`users/${user_id}/block-trend/${trend_id}`, APIURL), {
		method: 'PUT',
		headers: {
			contentType: 'application/json'
		}
	});
	if (response.ok) {
		return;
	} else {
		throw err;
	}
};

const unblockTrend = async (trend_id, user_id) => {
	let err = new Error();
	const response = await fetch(new URL(`users/${user_id}/unblock-trend/${trend_id}`, APIURL), {
		method: 'PUT',
		headers: {
			contentType: 'application/json'
		}
	});
	if (response.ok) {
		return;
	} else {
		throw err;
	}
};

// User

//Get user info by id
const getUserInfo = async userId => {
	let err = new Error();
	const response = await fetch(new URL(`users/${userId}`, APIURL), {
		method: 'Get',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (response.ok) {
		const user = await response.json();
		return user;
	} else {
		throw err;
	}
};

const addNormalPost = async post => {
	let err = new Error();
	const response = await fetch(new URL(`normal-posts/new-post`, APIURL), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	});
	if (response.ok) {
		return;
	} else {
		throw err;
	}
};

const getMyPosts = async () => {
	let err = new Error();
	const response = await fetch(new URL(`normal-posts/my-posts`, APIURL), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (response.ok) {
		const posts = await response.json();
		return posts;
	} else {
		throw err;
	}
};

const deleteNormalPostById = async npost_id => {
	let err = new Error();
	const response = await fetch(new URL(`normal-posts/post/${npost_id}`, APIURL), {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (response.ok) {
		return;
	} else {
		throw err;
	}
};

const editNormalPostById = async (post_id, post) => {
	let err = new Error();
	const response = await fetch(new URL(`normal-posts/post/${post_id}`, APIURL), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	});
	if (response.ok) {
		return;
	} else {
		throw err;
	}
};

const api = {
	getAllTrends,
	getPriorityTrends,
	addPriorityTrend,
	removePriorityTrend,
	getUserInfo,
	getBlockedTrends,
	getTrendById,
	blockTrend,
	unblockTrend,
	addNormalPost,
	getMyPosts,
	deleteNormalPostById,
	editNormalPostById
};

export default api;
