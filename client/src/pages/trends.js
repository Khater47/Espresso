import {useEffect, useState, useRef} from 'react';
import {Outlet, useNavigate, useOutletContext} from 'react-router-dom';
import {Row, Col, Button} from 'react-bootstrap';
import TrendFilters from '../components/TrendFilters/TrendFilters';
import api from '../api/api';
import {useScroll, motion} from 'framer-motion';

export default function Trends(props) {
	const [selected, setSelected] = useState('Trends');
	const [
		goBack,
		setGoBack,
		goBackTitle,
		setGoBackTitle,
		postRefresh,
		timer,
		setTimer,
		setNotificationInfo
	] = useOutletContext();
	const [showTrendsBar, setShowTrendsBar] = useState(true);
	const [trends, setTrends] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [filtered, setFiltered] = useState(false);
	const [tagFilters, setTagFilters] = useState([]);
	const [filtersApplied, setFiltersApplied] = useState({
		tags: [],
		time: ''
	});

	const navigate = useNavigate();

	const ref = useRef(null);
	const {scrollYProgress} = useScroll({container: ref});

	useEffect(() => {
		if (!filtered) {
			if (selected === 'Priority Trends') {
				setGoBack(false);
				const getMyTrends = () => {
					api
						.getPriorityTrends()
						.then(data => data.sort((a, b) => a.ranking - b.ranking))
						.then(data => setTrends(data));
				};
				getMyTrends();
			} else if (selected === 'Trends') {
				setGoBack(false);
				const getTrends = () => {
					api
						.getAllTrends()
						.then(data => data.sort((a, b) => a.ranking - b.ranking))
						.then(data => setTrends(data));
				};
				getTrends();
			} else if (selected === 'Blocked Trends') {
				setGoBack(true);
			} else if (selected === 'Specific Trend') {
				setGoBack(true);
			}
		} else {
			if (selected === 'Priority Trends') {
				setGoBack(false);
			} else if (selected === 'Trends') {
				setGoBack(false);
			} else if (selected === 'Blocked Trends') {
				setGoBack(true);
			} else if (selected === 'Specific Trend') {
				setGoBack(true);
			}
		}
	}, [selected, refresh, setGoBack, filtered]);
	return (
		<>
			{showTrendsBar && (
				<Row className="trends-bar">
					<Col
						onClick={() => {
							navigate('/trends/all');
						}}
						className={`${selected === 'Trends' ? 'selected-bar' : ''}`}
					>
						Trending
					</Col>
					<Col
						onClick={() => {
							navigate('/trends/priority');
						}}
						className={`${selected === 'Priority Trends' ? 'selected-bar' : ''}`}
					>
						Priority Trends
					</Col>
				</Row>
			)}
			{selected !== 'Specific Trend' && selected !== 'Blocked Trends' ? (
				<Row>
					<Col>
						<TrendFilters
							trends={trends}
							setTrends={setTrends}
							setFiltered={setFiltered}
							tagFilters={tagFilters}
							setTagFilters={setTagFilters}
							filtersApplied={filtersApplied}
							setFiltersApplied={setFiltersApplied}
						/>
					</Col>
				</Row>
			) : (
				<></>
			)}
			{filtered && selected !== 'Specific Trend' ? (
				<div className="filter-alert">
					<span>Some filters are currently applied</span>
					<span
						onClick={() => {
							setFiltered(false);
							setFiltersApplied({
								tags: [],
								time: ''
							});
						}}
					>
						RESET FILTERS
					</span>
				</div>
			) : null}
			<Row>
				{selected === 'Specific Trend' ? (
					<motion.div className="progress-bar" style={{scaleX: scrollYProgress}} />
				) : (
					<></>
				)}
				<Col ref={ref} className={`${goBack === true ? 'content-wrap' : 'content-wrap-noBack'}`}>
					<Outlet
						context={[
							setSelected,
							setShowTrendsBar,
							trends,
							...useOutletContext(),
							setTrends,
							refresh,
							setRefresh,
							filtered
						]}
					/>
					{selected === 'Trends' ? (
						<div className={filtered ? 'trend-footer-extended' : 'trend-footer'}>
							{filtered ? `Reset filters to see all trends` : `And that's all what's going on !`}
						</div>
					) : (
						<></>
					)}
				</Col>
			</Row>
		</>
	);
}
