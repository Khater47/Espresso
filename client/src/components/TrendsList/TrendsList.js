import TrendCard from '../TrendCard/TrendCard';

export default function TrendsList(props) {
	return (
		<>
			{props.trends.map(trend => {
				return (
					<TrendCard
						key={trend.trend_id}
						trend={trend}
						refresh={props.refresh}
						setRefresh={props.setRefresh}
						setNotificationInfo={props.setNotificationInfo}
					/>
				);
			})}
		</>
	);
}
