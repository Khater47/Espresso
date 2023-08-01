import styles from './index.module.scss';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import Select from 'react-select';
import {IoFunnelOutline} from 'react-icons/io5';
import api from '../../api/api';

export default function TrendFilters(props) {
	const TagsOptions = [
		{value: 'Sport', label: 'Sport'},
		{value: 'Science', label: 'Science'},
		{value: 'Tech', label: 'Tech'},
		{value: 'Economy', label: 'Economy'},
		{value: 'Politics', label: 'Politics'},
		{value: 'Celebrities', label: 'Celebrities'},
		{value: 'Cinema', label: 'Cinema'},
		{value: 'General', label: 'General'}
	];
	const [modalShow, setModalShow] = useState(false);
	const [tags, setTags] = useState([]);
	const [maxMinRead, setMaxMinRead] = useState('');
	const [allTrends, setAllTrends] = useState([]);

	useEffect(() => {
		const getTrends = () => {
			api
				.getAllTrends()
				.then(data => data.sort((a, b) => a.ranking - b.ranking))
				.then(data => setAllTrends(data));
		};
		getTrends();
		setTags(props.filtersApplied.tags);
		setMaxMinRead(props.filtersApplied.time);
	}, [props.filtersApplied.tags, props.filtersApplied.time]);
	return (
		<>
			<IoFunnelOutline
				size={40}
				className={styles.filterIcon}
				onClick={() => {
					setModalShow(true);
				}}
			/>

			<Modal
				onHide={() => {
					setModalShow(false);
				}}
				show={modalShow}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header className={styles.header} closeButton>
					<IoFunnelOutline className={styles.funnelIcon} size={30} />
					<Modal.Title id="contained-modal-title-vcenter">Filters</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col className="filterLabel" xs={4}>
							<p>
								<b>Tags</b>
							</p>
						</Col>
						<Col xs={8}>
							<Select
								defaultValue={
									tags.length > 0
										? tags.map(tag => {
												return {value: tag, label: tag};
										  })
										: []
								}
								isMulti
								name="Tag(s)"
								options={TagsOptions}
								className="basic-multi-select mb-3"
								classNamePrefix="select"
								onChange={event => {
									const values = event.map(element => {
										return element.value;
									});
									setTags([...values]);
								}}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form>
								<Form.Group as={Row} className="mb-3">
									<Form.Label column xs={5}>
										<b>Max. Read Time</b>
									</Form.Label>
									<Col>
										<Form.Control
											xs={7}
											value={maxMinRead}
											type="number"
											onChange={event => {
												setMaxMinRead(event.target.value);
											}}
											min="5"
											max="60"
										/>
									</Col>
								</Form.Group>
							</Form>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer className={styles.footer}>
					<Row>
						<Col>
							<Button
								className={styles.buttonReset}
								onClick={() => {
									props.setTrends(allTrends);
									setTags([]);
									setMaxMinRead('');
									setModalShow(false);
									props.setFiltered(false);
								}}
							>
								RESET
							</Button>
						</Col>
						<Col>
							{/*
                                trend={
                                    id: number,
                                    title: "Title",
                                    tags: "",
                                    time_needed: minutesNumber,
                                    textual_input: "summary",
                                    media_location: "http://example.com",
                                    creation_date: date,
                                    last_updated: date
                                }
                            */}
							<Button
								className={styles.buttonApply}
								onClick={() => {
									let data = [];
									if (maxMinRead === '' && tags.length === 0) {
										data = allTrends;
									} else if (maxMinRead !== '' && tags.length > 0) {
										data = allTrends.filter(trend => {
											return (
												trend.time_needed <= maxMinRead &&
												tags.find(tag => {
													props.setFiltered(true);
													return trend.tags === tag;
												}) !== undefined
											);
										});
									} else if (maxMinRead === '' && tags.length > 0) {
										data = allTrends.filter(trend => {
											return (
												tags.find(tag => {
													props.setFiltered(true);
													return trend.tags === tag;
												}) !== undefined
											);
										});
									} else if (maxMinRead !== '' && tags.length === 0) {
										data = allTrends.filter(trend => {
											props.setFiltered(true);
											return trend.time_needed <= maxMinRead;
										});
									}
									props.setFiltersApplied({
										tags: tags,
										time: maxMinRead
									});
									setModalShow(false);
									props.setTrends(data);
								}}
							>
								APPLY
							</Button>
						</Col>
					</Row>
				</Modal.Footer>
			</Modal>
		</>
	);
}
