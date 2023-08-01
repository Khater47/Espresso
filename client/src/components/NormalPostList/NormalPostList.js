import NormalPostCard from '../NormalPostCard/NormalPostCard';

export default function NormalPostList(props) {
	return (
		<>
			{props.posts.map(post => {
				return (
					<NormalPostCard
						key={post.npost_id}
						post={post}
						setRefresh={props.setRefresh}
						postRefresh={props.postRefresh}
						setPostRefresh={props.setPostRefresh}
						user={props.user}
						setNotificationInfo={props.setNotificationInfo}
					/>
				);
			})}
		</>
	);
}
