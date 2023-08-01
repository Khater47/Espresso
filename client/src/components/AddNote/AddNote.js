import styles from './index.module.scss';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import Select from 'react-select';
import {PencilSquare} from 'react-bootstrap-icons';
import api from '../../api/api';

export default function AddNote() {
	return (
		<>
			<PencilSquare size={40} className={styles.addIcon} onClick={() => {}} />
		</>
	);
}
