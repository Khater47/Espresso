import {Container, Row, Col} from 'react-bootstrap';
import {Outlet, useNavigate} from 'react-router-dom';
import BottomNavbar from '../components/BottomNavbar/BottomNavbar';
import PhoneStatusBar from '../components/PhoneStatusBar/PhoneStatusBar';
import EspressoBar from '../components/EspressoBar/EspressoBar';
import AddNote from '../components/AddNote/AddNote';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import {MdOutlineAdd} from 'react-icons/md';
import NewPost from '../components/NewPost/NewPost';
import Notification from '../components/Notification/Notification';

export default function MainContainer() {
	const [goBack, setGoBack] = useState(false);
	const [newPostShow, setNewPostShow] = useState(false);
	const [postRefresh, setPostRefresh] = useState(false);
	const [inSearch, setInSearch] = useState(false);
	const [goBackTitle, setGoBackTitle] = useState('optional');
	const navigate = useNavigate();
	const [timer, setTimer] = useState([0, 0, 0]);
	const [NotificationInfo, setNotificationInfo] = useState({});

	const handleGoBack = event => {
		event.preventDefault();
		setGoBackTitle('');
		navigate(-1);
	};

	return (
		<Container fluid>
			<Row className="phone-status-bar">
				<Col>
					<Notification
						notificationInfo={NotificationInfo}
						setNotificationInfo={setNotificationInfo}
					/>
				</Col>
			</Row>

			{goBack && (
				<Row className="return-bar">
					<Col onClick={handleGoBack} xs={2}>
						<FontAwesomeIcon className="fa-2x" icon={faArrowLeftLong} />
					</Col>
					<Col xs={9}>
						<p>
							<b>{goBackTitle}</b>
						</p>
					</Col>
				</Row>
			)}
			<Row className="espresso-bar">
				<Col>
					<EspressoBar timer={timer} setTimer={setTimer} />
				</Col>
			</Row>
			<Row>
				<Col>
					<Row>
						<Col>{inSearch ? <></> : <AddNote />}</Col>
					</Row>
					<Outlet
						context={[
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
						]}
					/>
				</Col>
			</Row>
			<Row className="new-post-row">
				<Col>
					<MdOutlineAdd
						onClick={() => {
							setNewPostShow(true);
						}}
						size={35}
					/>
					<NewPost
						show={newPostShow}
						setNotificationInfo={setNotificationInfo}
						onHide={() => {
							setNewPostShow(false);
							setPostRefresh(prev => !prev);
						}}
					/>
				</Col>
			</Row>
			<Row className="bottom-navbar">
				<Col>
					<BottomNavbar />
				</Col>
			</Row>
		</Container>
	);
}
