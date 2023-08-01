import {useEffect, useState, useRef} from 'react';
import {Col, Row, Button} from 'react-bootstrap';
import ReactPlayer from 'react-player';
import {useOutletContext, useLocation} from 'react-router-dom';
import api from '../api/api';
import parse from 'html-react-parser';

export default function Trend(props) {
	const [trend, setTrend] = useState({});
	const [text, setText] = useState('');
	const path = useLocation();
	const trend_id = path.pathname.split('/')[2];
	const [
		setSelected,
		setShowTrendsBar,
		trends,
		goBack,
		setGoBack,
		goBackTitle,
		setGoBackTitle,
		postRefresh,
		timer,
		setTimer,
		setNotificationInfo,
		setInSearch,
		setPostRefresh,
		setTrends,
		refresh,
		setRefresh
	] = useOutletContext();

	const ref = useRef(null);
	const handleScroll = () => {
		ref.current.scrollIntoView({behavior: 'smooth'});
	};

	useEffect(() => {
		setShowTrendsBar(false);
		setSelected('Specific Trend');
		const getTrendById = trend_id => {
			api
				.getTrendById(trend_id)
				.then(data => {
					setTrend(data);
					setText(data.textual_input);
					return data;
				})
				.then(data => setGoBackTitle(data?.title));
		};
		getTrendById(trend_id);
	}, [trend_id]);

	const dayjs = require('dayjs');
	const relativeTime = require('dayjs/plugin/relativeTime');

	dayjs.extend(relativeTime);

	const last_updated = dayjs(trend.last_updated).fromNow();

	return (
		<>
			<Col ref={ref}>
				<Row className="trend-photo">
					<img src={`${trend.media_location}`} alt="new" />
				</Row>
				<div className="trend-data">
					<h2 className="trend-title">{trend.title}</h2>
					<div>
						<span>Last update : {last_updated}</span>
						<span className="trend-dataTag">{trend.tags}</span>
					</div>
				</div>
				<Row>
					<Col></Col>

					<Col xs={4}></Col>
				</Row>
				<div className="trend-text">{parse(text)}</div>
				{/* <h4 className="media-header">Media</h4> */}
				<div className="video-player">
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${trend.video_id}`}
						width="100%"
						height="200px"
						controls={true}
						config={{
							youtube: {
								playerVars: {showinfo: 1, fs: 1}
							}
						}}
					/>
				</div>
				<div className="trend-footer-specific">That's a wrap !!</div>
				<Button className="back-to-top-button" onClick={handleScroll}>
					BACK TO TOP
				</Button>
			</Col>
		</>
	);
}
