import {useOutletContext} from 'react-router-dom';
import {useEffect} from 'react';
import api from '../api/api';
import {useState} from 'react';
import {ImCross} from 'react-icons/im';
import Table from 'react-bootstrap/Table';

export default function BlockedTrends() {
	const [blocked, setBlocked] = useState([]);
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
	useEffect(() => {
		const getBlockedTrends = async () => {
			api.getBlockedTrends().then(blocked_trends => {
				setBlocked(blocked_trends);
			});
		};
		getBlockedTrends();
		setShowTrendsBar(false);
		setSelected('Blocked Trends');
		setGoBackTitle('Blocked Trends');
	}, [setShowTrendsBar]);

	const unblockTrend = trend_id => {
		api.unblockTrend(trend_id, 1);
		const updateBlocked = blocked.filter(trend => {
			return trend.trend_id !== trend_id;
		});
		setBlocked(updateBlocked);
		setNotificationInfo({
			show: true,
			title: 'Unblock Trend',
			message: 'Trend unblocked'
		});
	};

	return (
		<>
			<h2 className="blocked-header">Blocked Trends</h2>
			<Table striped>
				<tbody>
					{blocked.length > 0 ? (
						blocked.map(trend => {
							return (
								<tr key={trend.trend_id}>
									<td>{trend.title}</td>
									<td>
										<ImCross
											size="1.2rem"
											onClick={() => {
												unblockTrend(trend.trend_id);
											}}
										/>
									</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td>
								<b>Blocked trends list is empty</b>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</>
	);
}
