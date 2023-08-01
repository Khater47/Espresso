import {useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import TrendsList from '../components/TrendsList/TrendsList';

export default function AllTrends() {
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

	/*
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
							setInSearch
							setTrends,
							refresh,
							setRefresh
	*/
	useEffect(() => {
		setSelected('Trends');
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
		</>
	);
}
