import {Outlet, useOutletContext} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import api from '../api/api';
import {useEffect, useState} from 'react';

export default function Profile() {
	const [user, setUser] = useState({});
	const setGoBack = useOutletContext()[1];
	const setGoBackTitle = useOutletContext()[3];

	useEffect(() => {
		setGoBack(true);
		setGoBackTitle('Michael Scott');
		const getUser = () => {
			api.getUserInfo(1).then(user => {
				setUser(user);
			});
		};
		getUser();
	}, [setGoBack, setGoBackTitle]);

	return (
		<Row>
			<Col className="profile-wrap">
				<Row>
					<Col>
						<div className="profile-info-container shadow">
							<div className="line"></div>
							<img src={user.profile_photo} alt="profile" className="myProfile-image  shadow" />
							<div className="user-info-container">
								<h2>{user.display_name}</h2>
								<p>{user.bio}</p>
							</div>
							<br />
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<Outlet context={[...useOutletContext()]} />
					</Col>
				</Row>
			</Col>
		</Row>
	);
}
