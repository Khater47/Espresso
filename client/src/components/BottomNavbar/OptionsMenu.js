import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import React from 'react';
import more from '../more.png';
import michael from '../../components/michael.jpeg';

export const OptionsMenu = React.forwardRef(({children, onClick}, ref) => {
	return (
		<img
			ref={ref}
			onClick={e => {
				e.preventDefault();
				onClick(e);
			}}
			className={styles.userIcon}
			src={michael}
			alt="My profile"
		>
			{children}
		</img>
	);
});
