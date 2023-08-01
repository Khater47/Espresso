import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';

import styles from './index.module.scss';
import TrendInfo from './TrendInfo';
import {useNavigate} from 'react-router-dom';
import {ThreeDots} from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import {TbBookmarkOff, TbBookmark, TbShare} from 'react-icons/tb';
import {HiOutlineSpeakerWave} from 'react-icons/hi2';
import {BiBlock} from 'react-icons/bi';
import {MdTimer} from 'react-icons/md';
import {AiFillCaretRight} from 'react-icons/ai';

import api from '../../api/api';

export default function TrendCard(props) {
	/*
    {
        "trend_id": 1,
        "title": "Elon musk and twitter crisis",
        "tags": "Tech|Economy",
        "time_needed": 500,
        "textual_input": "textual summary",
        "media_location": "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F220503123434-20220504-elon-musk-black-twitter-illustration.jpg",
        "creation_date": "Mon, 26 Dec 2022 19:39:15 GMT",
        "last_updated": "Tue, 27 Dec 2022 01:22:15 GMT"
    }
    */
	const trendPeak = props.trend.textual_input.split('.');
	const navigate = useNavigate();

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
		<Card className={styles.trendWholeCard}>
			<Card.Img variant="top" src={props.trend.media_location}></Card.Img>
			<Card.Body className="pt-1">
				<Row className="mb-2 align-items-center mt-0">
					<Col className={styles.trendNumber}>
						<span className="me-2"># {props.trend.ranking}</span>
					</Col>
					<Col className={` ${styles.trendTag}`}>
						<div>{props.trend.tags}</div>
					</Col>
					<Col className={styles.readTimeRow} xs={1}>
						<MdTimer className="me-1" size={15} />
						<span className={styles.readTime}>{props.trend.time_needed} min</span>
					</Col>
					<Col>
						<Dropdown>
							<Dropdown.Toggle
								className={styles.dorpdownToggle}
								as={ThreeDots}
								size={25}
								variant="success"
								id="dropdown-basic"
							/>
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
				<div className={styles.trendCardTitle}>{props.trend.title}</div>
				<div className={styles.textFlex}>
					<div
						onClick={() => {
							navigate(`/trends/${props.trend.trend_id}`);
						}}
						className={styles.trendCardBody}
					>
						<div>
							{props.trend.summary}...
							<i to={`/trends/${props.trend.trend_id}`} className={styles.trendLink}>
								read more.
							</i>
						</div>
					</div>
					<AiFillCaretRight
						className={styles.arrow}
						onClick={() => {
							navigate(`/trends/${props.trend.trend_id}`);
						}}
					/>
				</div>
			</Card.Body>
		</Card>
		// <Card className={styles.trendWholeCard}>
		// 	<Card.Body className="pt-1 pe-0">
		// 		<TrendInfo trend={props.trend} refresh={props.refresh} setRefresh={props.setRefresh} />
		// <div className={styles.trendCardTitle}>{props.trend.title}</div>
		// <div className={styles.textFlex}>
		// 	<div
		// 		onClick={() => {
		// 			navigate(`/trends/${props.trend.trend_id}`);
		// 		}}
		// 		className={styles.trendCardBody}
		// 	>
		// 		<div>
		// 			{props.trend.summary}...
		// 			<i to={`/trends/${props.trend.trend_id}`} className={styles.trendLink}>
		// 				read more.
		// 			</i>
		// 		</div>
		// 	</div>
		// 	<AiFillCaretRight
		// 		className={styles.arrow}
		// 		onClick={() => {
		// 			navigate(`/trends/${props.trend.trend_id}`);
		// 		}}
		// 	/>
		// </div>
		// 	</Card.Body>
		// </Card>
	);
}
