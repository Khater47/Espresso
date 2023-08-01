import {useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import TrendsList from '../components/TrendsList/TrendsList';

export default function PriorityTrends() {
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
		setRefresh,
		filtered
	] = useOutletContext();
	useEffect(() => {
		setSelected('Priority Trends');
		setShowTrendsBar(true);
	}, [setSelected, setShowTrendsBar]);
	return (
		<>
			<TrendsList
				trends={trends}
				refresh={refresh}
				setRefresh={setRefresh}
				setNotificationInfo={setNotificationInfo}
			/>
			<div className={filtered ? 'trend-footer-extended' : 'trend-footer'}>
				End of your favourite trends !
			</div>
		</>
	);
}
