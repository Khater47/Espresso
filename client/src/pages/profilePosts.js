import {useEffect, useState} from 'react';
import {useOutletContext} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import NormalPostList from '../components/NormalPostList/NormalPostList';
import api from '../api/api';

export default function ProfilePosts() {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState({});
	const [refresh, setRefresh] = useState(false);
	const [
		goBack,
		setGoBack,
		goBackTitle,
		setGoBackTitle,
		postRefresh,
		timer,
		setTimer,
		setNotificationInfo,
		setInSearch,
		setPostRefresh
	] = useOutletContext();

	useEffect(() => {
		const getUserInfo = async () => {
			api.getUserInfo(1).then(user => {
				setUser(user);
			});
		};
		getUserInfo();

		const getMyPosts = () => {
			api
				.getMyPosts()
				.then(data => data.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date)))
				.then(data => setPosts(data));
		};
		getMyPosts();
	}, [setPosts, refresh, postRefresh]);

	return (
		<div className="mb-5">
			<NormalPostList
				posts={posts}
				setRefresh={setRefresh}
				postRefresh={postRefresh}
				setPostRefresh={setPostRefresh}
				user={user}
				setNotificationInfo={setNotificationInfo}
			/>
		</div>
	);
}
