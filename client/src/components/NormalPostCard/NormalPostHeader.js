import {Row, Col, Modal, Button, Form} from 'react-bootstrap';
import styles from './index.module.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import {ThreeDots} from 'react-bootstrap-icons';
import api from '../../api/api';
import {FaTrash, FaShareAlt, FaBookmark, FaEyeSlash} from 'react-icons/fa';
import {useState} from 'react';
import {RiImageAddFill} from 'react-icons/ri';
import {AiOutlinePaperClip} from 'react-icons/ai';
import {FaPencilAlt} from 'react-icons/fa';

export default function NormalPostHeader(props) {
	const [showModalConfirm, setShowModalConfirm] = useState(false);
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [post, setPost] = useState(props.post.textual_input);

	const dayjs = require('dayjs');
	const relativeTime = require('dayjs/plugin/relativeTime');

	dayjs.extend(relativeTime);

	const dateCreated = dayjs(props.post.creation_date).fromNow();

	const handleDelete = async event => {
		await api.deleteNormalPostById(props.post.npost_id);
		props.setNotificationInfo({
			show: true,
			title: 'Delete Post',
			message: 'Post deleted'
		});
		props.setRefresh(prev => !prev);
		setShowModalConfirm(false);
	};

	const editPost = async post => {
		return await api.editNormalPostById(props.post.npost_id, post);
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const postObject = {
			textual_input: post,
			media_location: null,
			life_event: 0,
			creation_date: props.post.creation_date,
			nshared_id: null,
			sshared_id: null
		};
		editPost(postObject);
		setShowModalEdit(false);
		props.setNotificationInfo({
			show: true,
			title: 'Edited Post',
			message: 'Post edited'
		});
		props.setPostRefresh(prev => !prev);
	};

	/*
		When adding the handle edit method add this to the body to add edit feedback
		props.setNotificationInfo({
			show: true,
			title: 'Edit Post',
			message: 'Post Edited successfully'
		});

	*/

	return (
		<>
			<Row className={styles.header}>
				<Col className={styles.profileData}>
					<img className={styles.profilePhoto} src={`${props.user.profile_photo}`} alt="Profile" />

					<Col>
						<div className={styles.profileName}>{props.user.display_name}</div>
						<div className={styles.timeCreated}>
							{dateCreated}
							{props.post.isEdited ? (
								<span>
									{' '}
									| <i className="small"> Edited</i>
								</span>
							) : (
								<></>
							)}{' '}
						</div>
					</Col>
				</Col>
				<Col className={styles.dropDownMenu} xs={2}>
					<Dropdown>
						<Dropdown.Toggle as={ThreeDots} className={styles.toggle} id="dropdown-basic" />
						<Dropdown.Menu className={styles.dropDownBody}>
							<Dropdown.Item
								className={styles.dropDownItem}
								onClick={() => {
									setShowModalConfirm(true);
								}}
							>
								<FaTrash className="me-1" />
								<span> Delete Post</span>
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item
								className={styles.dropDownItem}
								onClick={() => {
									setShowModalEdit(true);
								}}
							>
								<FaPencilAlt className="me-1" />
								<span>Edit Post</span>
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item className={styles.dropDownItem}>
								<FaShareAlt className="me-1" />
								<span> Share via</span>
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Col>
			</Row>
			<Modal show={showModalConfirm} onHide={() => setShowModalConfirm(false)} centered>
				<Modal.Header closeButton className={styles.modalHeader}>
					<FaTrash className="me-1" size={20} />
					<Modal.Title>Delete Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete this post?</Modal.Body>
				<Modal.Footer className={styles.modalFooter}>
					<Button
						variant="outline-secondary"
						className={`${styles.modalCancelBtn} ${styles.modalBtn}`}
						onClick={() => setShowModalConfirm(false)}
					>
						CANCEL
					</Button>
					<Button
						variant="outline-danger"
						className={`${styles.modalDeleteBtn} ${styles.modalBtn}`}
						onClick={handleDelete}
					>
						DELETE
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showModalEdit} onHide={() => setShowModalEdit(false)} centered>
				<Modal.Header className={styles.modalHeader} closeButton>
					<FaPencilAlt className="ms-2 me-2" size={20} />
					<Modal.Title id="contained-modal-title-vcenter">Edit Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col>
							<Form className={styles.form}>
								<Form.Control
									as="textarea"
									rows={5}
									required
									value={post}
									placeholder="What do you want to share"
									onChange={ev => setPost(ev.target.value)}
								/>
							</Form>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer className={`d-flex justify-content-around ${styles.footerEdit}`}>
					<Row className={styles.icons}>
						<Col>
							<AiOutlinePaperClip size="2rem" />
						</Col>
						<Col>
							<RiImageAddFill size="2rem" />
						</Col>
					</Row>
					<Row className="me-0">
						<Col>
							<Button className={styles.buttonCancel} onClick={props.onHide}>
								CANCEL
							</Button>
						</Col>
						<Col className="px-0">
							<Button className={styles.buttonEdit} onClick={handleSubmit}>
								EDIT
							</Button>
						</Col>
					</Row>
				</Modal.Footer>
			</Modal>
		</>
	);
}
