import styles from './index.module.scss';
import {Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignal, faWifi, faBatteryFull} from '@fortawesome/free-solid-svg-icons';

export default function PhoneStatusBar() {
	return (
		<Row>
			<Col xs={2}>
				<p>
					<b>9:41</b>
				</p>
			</Col>
			<Col xs={{span: 1, offset: 7}}>
				<FontAwesomeIcon icon={faSignal} />
			</Col>
			<Col xs={1}>
				<FontAwesomeIcon icon={faWifi} />
			</Col>
			<Col xs={1}>
				<FontAwesomeIcon icon={faBatteryFull} />
			</Col>
		</Row>
	);
}
