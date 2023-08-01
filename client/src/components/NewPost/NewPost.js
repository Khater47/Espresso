import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Row, Col, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {RiImageAddFill} from 'react-icons/ri';
import {AiOutlinePaperClip} from 'react-icons/ai';
import {IoInformationCircleOutline} from 'react-icons/io5';
import api from '../../api/api';
import styles from './index.module.scss';
import {useNavigate} from 'react-router-dom';
import michael from '../michael.jpeg';

export default function NewPost(props) {
	/*
        user = {
            user_id: number,
            email: string,
            password: string,
            name: string,
            surname: string,
            display_name: string,
            dob: string,
            gender: string (M/F)
            country: string,
            bio: string,
            saved_posts: string,
            friends: string (id1|id2|Id3...)
            trends: string (id1|id2...)
            blocked_trends: string (id1|id2...)
        }    
    */
	const [postType, setPostType] = useState('normal');
	const [lifeEvent, setLifeEvent] = useState(false);
	const [user, setUser] = useState({});
	const [post, setPost] = useState('');

	const navigate = useNavigate();

	const addPost = async post => {
		props.setNotificationInfo({
			show: true,
			title: 'Create new post',
			message: 'Post created'
		});
		return await api.addNormalPost(post);
	};

	const handleSubmit = async () => {
		if (postType === 'normal') {
			const postObject = {
				textual_input: post,
				media_location: null,
				life_event: lifeEvent,
				nshared_id: null,
				sshared_id: null
			};

			addPost(postObject);
			setPost('');
			props.onHide();
			navigate('/profiles/1/posts', {replace: true});
		}

		// here goes the same for smart content post
	};

	useEffect(() => {
		const getUserInfo = async () => {
			// Agrrement was current logged user for demo is user with id 1
			api.getUserInfo(1).then(user => {
				setUser(user);
			});
		};
		getUserInfo();
	}, []);
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header className={styles.header} closeButton>
				<img src={michael} alt="Michael Scott" className={styles.userIcon} />
				<Modal.Title id="contained-modal-title-vcenter">{user.display_name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className={styles.postType}>
					<Col
						className={postType === 'normal' ? styles.selected : ''}
						onClick={() => {
							setPostType('normal');
						}}
					>
						Profile Post
					</Col>
					<Col className={postType === 'smart' ? styles.selected : ''}>Smart Content</Col>
				</Row>
				<IoInformationCircleOutline size={20} color="grey" />
				<i className="info-text">This post will be added to your profile</i>
				<Row className="mt-1">
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
			<Modal.Footer className={`d-flex justify-content-around ${styles.footer}`}>
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
						<Button className={styles.buttonPost} onClick={handleSubmit}>
							POST
						</Button>
					</Col>
				</Row>
			</Modal.Footer>
		</Modal>
	);
}
