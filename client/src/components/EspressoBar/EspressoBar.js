import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router';
import {GiCoffeeCup} from 'react-icons/gi';
import styles from './index.module.scss';
import {useEffect, useState} from 'react';
import espresso from '../../components/espresso.png';
import michael from '../../components/michael.jpeg';
import OptionsOffCanvas from '../BottomNavbar/OptionsOffCanvas';

export default function EspressoBar(props) {
	const navigate = useNavigate();
	const [displayTimer, setDisplayTimer] = useState('00:00');
	useEffect(() => {
		const updateTimer = () => {
			if (props.timer[0] === undefined || isNaN(props.timer[0]) || props.timer[0] === '') {
				setDisplayTimer('00:00');
			} else {
				let min =
					props.timer[0] < 10 ? `0${parseInt(props.timer[0], 10)}` : parseInt(props.timer[0], 10);
				let sec =
					props.timer[1] < 10 ? `0${parseInt(props.timer[1], 10)}` : parseInt(props.timer[1], 10);
				setDisplayTimer(`${min}:${sec}`);
			}
		};
		updateTimer();
	}, [props.timer]);
	return (
		<Row className={`${styles.EspressoBarContainer} shadow-sm`}>
			<Col className={styles.EspressoBarItem} xs={2}>
				<OptionsOffCanvas />
			</Col>
			<Col
				xs={5}
				onClick={() => {
					navigate('/timer');
				}}
				className={styles.EspressoBarItem}
			>
				{/*<img className={styles.espressoIcon} src={espresso} alt="Espresso logo" />*/}
				<GiCoffeeCup className={styles.espressoIcon} size={40} />
				<span className={`ms-2 mt-1`}>
					<div className={styles.timerText}>{displayTimer}</div>
				</span>
			</Col>
			<Col xs={2} className={styles.EspressoBarItem} id={styles.searchIcon}>
				<FontAwesomeIcon
					className={styles.searchIcon}
					icon={faMagnifyingGlass}
					onClick={() => {
						navigate('/search');
					}}
				/>
			</Col>
		</Row>
	);
}
