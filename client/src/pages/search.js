import {Form, Row, Col, InputGroup} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import {ImCross} from 'react-icons/im';
import ListGroup from 'react-bootstrap/ListGroup';
import api from '../api/api';
import {useNavigate, useOutletContext} from 'react-router-dom';

export default function Search() {
	const [searchText, setSearchText] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const setGoBack = useOutletContext()[1];
	const setGoBackTitle = useOutletContext()[3];
	const setInSearch = useOutletContext()[8];
	const navigate = useNavigate();

	useEffect(() => {
		setInSearch(true);
		const getTrends = () => {
			api
				.getAllTrends()
				.then(trends => {
					const newTrends = trends.map(trend => {
						return {
							title: trend.title,
							id: trend.trend_id
						};
					});
					return newTrends;
				})
				.then(newTrends => setSuggestions(newTrends));
		};
		getTrends();
		setGoBack(true);
		setGoBackTitle('Search');
		return () => {
			setGoBack(false);
			setInSearch(false);
		};
	}, [setGoBack, setGoBackTitle]);

	const handleSubmit = event => {
		event.preventDefault();
	};

	return (
		<>
			<Row>
				<Col>
					<Form onSubmit={handleSubmit}>
						<InputGroup>
							<Form.Control
								type="text"
								autoFocus
								value={searchText}
								placeholder="Type to search"
								className="search-input"
								onChange={event => {
									setSearchText(event.target.value);
								}}
							/>

							<button className="search-input-icon-button">
								{searchText === '' ? (
									<FaSearch size={25} type="submit" />
								) : (
									<ImCross
										size={25}
										onClick={() => {
											setSearchText('');
										}}
									/>
								)}
							</button>
						</InputGroup>
					</Form>
				</Col>
			</Row>
			<Row className="search-category-container">
				<Col className="search-category left selected-category">Trends</Col>
				<Col className="search-category middle disabled">Posts</Col>
				<Col className="search-category right disabled">People</Col>
			</Row>
			{searchText !== '' && (
				<Row>
					<Col>
						<ListGroup>
							{suggestions
								.filter(suggestion => {
									return suggestion.title.toLowerCase().includes(searchText.toLowerCase());
								})
								.map(suggestion => {
									return (
										<ListGroup.Item
											className="search-item"
											key={suggestion.id}
											onClick={() => {
												navigate(`/trends/${suggestion.id}`, {replace: true}); // Replaces search page in stack history so you don't go back to search again
											}}
										>
											{suggestion.title}
										</ListGroup.Item>
									);
								})}
						</ListGroup>
					</Col>
				</Row>
			)}
		</>
	);
}
