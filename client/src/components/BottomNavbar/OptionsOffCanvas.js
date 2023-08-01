import React, {useState, useEffect} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {OptionsMenu} from './OptionsMenu';
import {FaUserCircle, FaUserFriends} from 'react-icons/fa';
import {IoIosJournal} from 'react-icons/io';
import {ImBlocked} from 'react-icons/im';
import {BsFillGearFill, BsFillClockFill} from 'react-icons/bs';
import {BiLogOutCircle} from 'react-icons/bi';
import {useNavigate, useLocation} from 'react-router';
import styles from './index.module.scss';
import {GiCoffeeCup} from 'react-icons/gi';
import michael from '../../components/michael.jpeg';

export default function OptionsOffCanvas() {
	const [show, setShow] = useState(false);
	const [inBlocked, setInBlocked] = useState(false);
	const [inProfile, setInProfile] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const path = useLocation();
	const pathname = path.pathname;

	const handleOnShow = () => {
		if (pathname === '/trends/blocked') {
			setInBlocked(true);
		} else setInBlocked(false);

		if (pathname === '/profiles/1/posts') {
			setInProfile(true);
		} else setInProfile(false);
	};

	const navigate = useNavigate();

	return (
		<>
			<OptionsMenu onClick={handleShow} />
			<Offcanvas show={show} onShow={handleOnShow} onHide={handleClose} placement="start">
				<Offcanvas.Header className="d-flex justify-content-around" closeButton>
					<Offcanvas.Title>
						<GiCoffeeCup size={30} className={styles.offLogo} />
						ESPRESSO
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ul className={styles.offCanvasBody}>
						<li
							className={inProfile ? styles.selected : ''}
							onClick={() => {
								handleClose();
								navigate('/profiles/1/posts');
							}}
						>
							<img src={michael} alt="profile" className={styles.optionsProfileImg}></img>
							My Profile
						</li>

						<li>
							<IoIosJournal size="1.5rem" className="me-2" />
							My Notes
						</li>

						<li>
							<FaUserFriends size="1.5rem" className="me-2" />
							My Friends
						</li>

						<li
							className={inBlocked ? styles.selected : ''}
							onClick={() => {
								handleClose();
								navigate('/trends/blocked');
							}}
						>
							<ImBlocked size="1.5rem" className="me-2" />
							Blocked Trends
						</li>

						<li>
							<BsFillClockFill size="1.5rem" className="me-2" />
							Usage Report
						</li>

						<li>
							<BsFillGearFill size="1.5rem" className="me-2" />
							Settings
						</li>

						<li className={styles.logOut}>
							<BiLogOutCircle size="1.5rem" className="me-2" />
							Logout
						</li>
					</ul>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}
