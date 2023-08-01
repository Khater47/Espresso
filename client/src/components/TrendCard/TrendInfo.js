import {Row, Col} from 'react-bootstrap';
import {
	BookHalf,
	ThreeDots,
	BookmarkStarFill,
	BookmarkXFill,
	ShareFill,
	VolumeUp,
	SlashCircleFill
} from 'react-bootstrap-icons';
import {MdTimer} from 'react-icons/md';
import styles from './index.module.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import api from '../../api/api';
import {TbBookmarkOff, TbBookmark, TbShare} from 'react-icons/tb';
import {HiOutlineSpeakerWave} from 'react-icons/hi2';
import {BiBlock} from 'react-icons/bi';

//We need to add feedback toast

export default function TrendInfo(props) {
	const addPriorityTrend = async () => {
		props.setNotificationInfo({
			show: true,
			title: 'Priority Trends',
			message: 'Trend added'
		});
		return await api.addPriorityTrend(props.trend.trend_id);
	};

	const removePriorityTrend = async () => {
		await api.removePriorityTrend(props.trend.trend_id);
		props.setRefresh(prev => !prev);
		props.setNotificationInfo({
			show: true,
			title: 'Priority Trends',
			message: 'Trend removed'
		});
		return;
	};

	const blockTrend = async () => {
		await api.blockTrend(props.trend.trend_id, 1);
		props.setRefresh(prev => !prev);
		props.setNotificationInfo({
			show: true,
			title: 'Block Trend',
			message: 'Trend Blocked'
		});
		return;
	};

	return (
		<Row className={styles.infoRaw}>
			<Col className={styles.trendNumber}>
				<div># {props.trend.ranking}</div>
			</Col>
			<Col xs={4}>
				<MdTimer className="me-1" size={20} />
				<span className={styles.readTime}>{props.trend.time_needed} min</span>
			</Col>
			<Col className={`me-3 ${styles.trendTag}`}>
				<div>{props.trend.tags}</div>
			</Col>
			<Col className={styles.dropDownMenu}>
				<Dropdown>
					<Dropdown.Toggle as={ThreeDots} variant="success" id="dropdown-basic" />
					<Dropdown.Menu className={styles.dropDownBody}>
						<Dropdown.Item
							className={styles.dropDownItem}
							onClick={() => {
								addPriorityTrend();
							}}
						>
							<TbBookmark size={25} />
							<span> Mark as priority</span>
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item
							className={styles.dropDownItem}
							onClick={() => {
								removePriorityTrend();
							}}
						>
							<TbBookmarkOff size={25} />
							<span> Mark as non priority</span>
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item className={styles.dropDownItem} onClick={() => {}}>
							<TbShare size={25} />
							<span> Share</span>
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item className={styles.dropDownItem} onClick={() => {}}>
							<HiOutlineSpeakerWave size={25} />
							<span> Play summary audio</span>
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item
							className={styles.dropDownItem}
							onClick={() => {
								blockTrend();
							}}
						>
							<BiBlock size={25} />
							<span> Block</span>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Col>
		</Row>
	);
}
