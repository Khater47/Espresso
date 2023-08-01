import {ToastContainer} from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import {GiCoffeeCup} from 'react-icons/gi';
import styles from './index.module.scss';

export default function Notification(props) {
	if (
		props.notificationInfo.show === true &&
		props.notificationInfo.title === 'Espresso session ended'
	) {
		window.navigator.vibrate([700, 350, 700, 350, 700, 350, 700]);
	}
	return (
		<>
			{props.notificationInfo.title === 'Espresso session ended' ? (
				<>
					<ToastContainer className={styles.toastContainer} position="top-center">
						<Toast
							delay={5000}
							autohide
							className={styles.toast}
							onClose={() =>
								props.setNotificationInfo({
									show: false,
									title: '',
									message: ''
								})
							}
							show={props.notificationInfo.show ? props.notificationInfo.show : false}
						>
							<Toast.Header>
								<GiCoffeeCup className="rounded me-2" />
								<strong className="me-auto">
									{props.notificationInfo.title ? props.notificationInfo.title : ''}
								</strong>
								<small>NOW</small>
							</Toast.Header>
							<Toast.Body>
								{props.notificationInfo.message ? props.notificationInfo.message : ''}
							</Toast.Body>
						</Toast>
					</ToastContainer>
				</>
			) : (
				<ToastContainer className={styles.toastContainerMiddle} position="bottom-center">
					<Toast
						delay={2000}
						autohide
						className={styles.toastMiddle}
						onClose={() =>
							props.setNotificationInfo({
								show: false,
								title: '',
								message: ''
							})
						}
						show={props.notificationInfo.show ? props.notificationInfo.show : false}
					>
						<Toast.Body>
							{props.notificationInfo.message ? props.notificationInfo.message : ''}
						</Toast.Body>
					</Toast>
				</ToastContainer>
			)}
		</>
	);
}
