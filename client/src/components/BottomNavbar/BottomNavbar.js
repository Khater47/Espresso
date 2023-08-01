//import styles from './index.module.scss';
import {Row, Col, Dropdown} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowTrendUp, faHouseChimney} from '@fortawesome/free-solid-svg-icons';
import {useNavigate, useLocation} from 'react-router';
import {useEffect, useState} from 'react';
import {OptionsMenu} from './OptionsMenu';
import {FaRegLightbulb} from 'react-icons/fa';
import {IoIosJournal} from 'react-icons/io';
import {ImBlocked} from 'react-icons/im';
import {BsFillGearFill, BsFillClockFill} from 'react-icons/bs';
import {BiLogOutCircle} from 'react-icons/bi';
import styles from './index.module.scss';
import home from '../home.png';
import trending from '../trending.png';
import {IoTrendingUpOutline} from 'react-icons/io5';
import OptionsOffCanvas from './OptionsOffCanvas';

//temp icons
import {BsHouse} from 'react-icons/bs';

export default function BottomNavbar() {
	const [inTrending, setInTrending] = useState(false);

	const path = useLocation();
	const pathname = path.pathname.split('/');
	useEffect(() => {
		if (pathname[1] === 'trends' && pathname[2] === 'blocked') {
			setInTrending(false);
		} else if (pathname[1] === 'trends' && pathname[2] !== 'blocked') {
			setInTrending(true);
		} else setInTrending(false);
	}, [path]);

	const navigate = useNavigate();
	return (
		<Row className={styles.bottomRow}>
			<Col onClick={() => {}}>
				{/*<img src={home} alt="Home" className={styles.homeIcon} />*/}
				<BsHouse size={50} className={styles.homeIcon} />
				<p>Home</p>
			</Col>
			<Col
				className={inTrending ? `${styles.inTrendingIcon}` : ''}
				onClick={() => {
					navigate('/trends/all');
				}}
			>
				{/* <img src={trending} alt="Trending" className={styles.trendingIcon}/> */}
				<IoTrendingUpOutline size={50} />
				<p>Trending</p>
			</Col>
			<Col onClick={() => {}}>
				<FaRegLightbulb size={41} className={styles.smartIcon} />
				<p>Smart</p>
			</Col>
		</Row>
	);
}
