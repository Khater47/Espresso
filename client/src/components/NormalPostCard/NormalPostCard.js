import Card from 'react-bootstrap/Card';
import styles from './index.module.scss';
import {useState, useEffect} from 'react';
import NormalPostHeader from './NormalPostHeader';
import NormalPostFooter from './NormalPostFooter';

export default function NormalPostCard(props) {
	const [expanded, setExpanded] = useState(false);
	const [long, setLong] = useState(false);

	// const textDivided = props.post.textual_input.match(/(.|[\n]){1,200}/g);

	// if (textDivided.length() > 1) {
	// 	setLong(true);
	// }

	function splitString(str) {
		if (str.length > 200) {
			const firstPart = str.substring(0, 205);
			const secondPart = str.substring(205);
			return [firstPart, secondPart];
		}
		return [str];
	}
	const text = splitString(props.post.textual_input);

	useEffect(() => {
		if (text.length > 1) {
			setLong(true);
		}
	}, [props.postRefresh]);

	return (
		<Card className={styles.postCard}>
			<Card.Body className={styles.body}>
				<NormalPostHeader
					post={props.post}
					setRefresh={props.setRefresh}
					setPostRefresh={props.setPostRefresh}
					user={props.user}
					setNotificationInfo={props.setNotificationInfo}
				/>
				<div className={styles.textDiv}>
					{long ? (
						<pre className={styles.postText}>
							{expanded ? (
								<>
									{props.post.textual_input}
									<i
										className={styles.showMore}
										onClick={() => {
											setExpanded(false);
										}}
									>
										Show less.
									</i>
								</>
							) : (
								<>
									{text[0]}{' '}
									<i
										className={styles.showMore}
										onClick={() => {
											setExpanded(true);
										}}
									>
										...Show more.
									</i>
								</>
							)}
						</pre>
					) : (
						<pre className={styles.postText}>{text[0]}</pre>
					)}
				</div>
			</Card.Body>
			<NormalPostFooter />
		</Card>
	);
}
