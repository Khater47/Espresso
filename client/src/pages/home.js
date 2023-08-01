import {Outlet, useOutletContext} from 'react-router-dom';
import {useEffect, useState} from 'react';

export default function Home() {
	const setGoBack = useOutletContext()[1];

	useEffect(() => {
		setGoBack(false);
	}, []);

	return (
		<>
			<h1>Home</h1>
			<Outlet />
		</>
	);
}
