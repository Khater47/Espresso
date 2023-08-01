import styles from './index.module.scss';
import {useState} from 'react';
import {FaShare, FaRegThumbsUp, FaThumbsUp, FaRegCommentAlt} from 'react-icons/fa';

export default function NormalPostFooter(props) {
	const [liked, setLiked] = useState(false);

	return (
		<div className={styles.footer}>
			<div className={styles.footerLeft} onClick={() => setLiked(prev => !prev)}>
				{liked ? (
					<FaThumbsUp className="me-1 ms-2" size={18} color="white" />
				) : (
					<FaRegThumbsUp className="me-1 ms-2" size={18} color="white" />
				)}
				<span className={styles.likeText}>Like</span>
			</div>
			<div>
				<FaRegCommentAlt className="me-1" size={18} color="white" />{' '}
				<span className={styles.likeText}>Comment</span>
			</div>
			<div className={styles.footerRight}>
				<FaShare className="me-1" size={18} color="white" />{' '}
				<span className={styles.likeText}>Share</span>
			</div>
		</div>
	);
}
