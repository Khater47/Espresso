import {useOutletContext} from 'react-router-dom';
import {Row, Col, Form, FormGroup, Button} from 'react-bootstrap';
import {GiCoffeeCup} from 'react-icons/gi';
import {useEffect, useState} from 'react';
import espresso from '../components/espressoLarge.png';

export default function Timer() {
	const setGoBack = useOutletContext()[1];
	const setGoBackTitle = useOutletContext()[3];
	const timer = useOutletContext()[5];
	const setTimer = useOutletContext()[6];
	const [validated, setValidated] = useState(false);
	const [ongoingTimer, setOngoingTimer] = useState(timer[0] > 0 || timer[1] > 0 ? true : false);
	const setNotificationInfo = useOutletContext()[7];

	useEffect(() => {
		setGoBack(true);
		setGoBackTitle('ESPRESSO Timer');

		return () => {
			console.log('Unmounted');
			console.log(timer[2]);
			setGoBack(false);

			if (timer[2] === 0) {
				setTimer([0, 0, 0]);
			}
		};
	}, [ongoingTimer]);

	const handleSubmit = event => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
			setTimer([0, 0, 0]);
			setOngoingTimer(false);
		} else {
			startTimer(timer[0] * 60);
			setOngoingTimer(true);
		}
		setValidated(true);
	};

	const startTimer = duration => {
		var time = duration,
			minutes,
			seconds;
		const value = setInterval(() => {
			minutes = parseInt(time / 60, 10);
			seconds = parseInt(time % 60, 10);

			minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
			seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
			setTimer(() => {
				return [minutes, seconds, value];
			});

			if (--time < 0) {
				clearInterval(value);
				setOngoingTimer(false);
				setValidated(false);
				setTimer([0, 0, 0]);
				setNotificationInfo({
					show: true,
					title: 'Espresso session ended',
					message: 'Your Espresso session ended'
				});
			}
		}, 1000);
		setTimer(() => {
			const newTimer = [timer[0], timer[1], value];
			return newTimer;
		});
	};

	return (
		<>
			<Row className="my-4">
				<Col className="timer-logo">
					<div className="shadow-lg">
						<GiCoffeeCup className="espressoLogoLarge" />
					</div>
				</Col>
			</Row>
			<div className="timer-layer">
				{!ongoingTimer ? (
					<Row className="mb-1">
						<Col>
							<h3>
								How long will your{' '}
								<b>
									<i>ESPRESSO</i>
								</b>{' '}
								last?
							</h3>
						</Col>
					</Row>
				) : (
					<Row>
						<Col>
							<h3>
								Enjoy your
								<b>
									<i> ESPRESSO</i>
								</b>{' '}
								!!
							</h3>
						</Col>
					</Row>
				)}
				<Row>
					<Col>
						<Form noValidate validated={validated} onSubmit={handleSubmit}>
							<Row className="mb-3">
								<Col>
									{!ongoingTimer && (
										<FormGroup as={Col} className="timer-input position-relative">
											<Form.Control
												type="number"
												value={timer[0] === 0 ? '' : timer[0]}
												onChange={e => {
													const value = e.target.value;
													if (value > 60) {
														return;
													}
													setTimer(() => {
														return [value, 0, timer[2]];
													});
												}}
												required
												min={1}
												max={60}
												disabled={ongoingTimer}
											/>
											<Form.Control.Feedback className="val-tooltip" type="invalid" tooltip>
												Please enter a number between 1 and 60
											</Form.Control.Feedback>
											<Form.Text>Choose session duration between 1 and 60 minutes</Form.Text>
										</FormGroup>
									)}
								</Col>
							</Row>
							<Row>
								<Col>
									<Button
										className="stopTimer-btn"
										onClick={() => {
											clearInterval(timer[2]);
											setTimer([0, 0, 0]);
											setOngoingTimer(false);
											setValidated(false);
										}}
									>
										{ongoingTimer === true ? 'STOP TIMER' : 'RESET'}
									</Button>
								</Col>
								{!ongoingTimer && (
									<Col>
										<Button className="setTimer-btn" type="submit">
											START TIMER
										</Button>
									</Col>
								)}
							</Row>
						</Form>
					</Col>
				</Row>
			</div>
		</>
	);
}
