import './styles/base.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainContainer from './pages/mainContainer';
import AllTrends from './pages/allTrends';
import BlockedTrends from './pages/blockedTrends';
import FriendsFeed from './pages/friendsFeed';
import FriendsList from './pages/friendsList';
import FriendRequests from './pages/friendRequests';
import Home from './pages/home';
import Notes from './pages/notes';
import PriorityTrends from './pages/priorityTrends';
import Profile from './pages/profile';
import ProfilePosts from './pages/profilePosts';
import SmartFeed from './pages/smartFeed';
import Timer from './pages/timer';
import Trend from './pages/trend';
import Trends from './pages/trends';
import Search from './pages/search';

function App() {
	return (
		<div className="App">
			<Router>
				<Espresso />
			</Router>
		</div>
	);
}

function Espresso() {
	return (
		<Routes>
			<Route path="/" element={<MainContainer />}>
				<Route path="home" element={<Home />}>
					<Route path="smart-feed" element={<SmartFeed />} />
					<Route path="friends-feed" element={<FriendsFeed />} />
				</Route>
				<Route path="timer" element={<Timer />} />
				<Route path="search" element={<Search />} />
				<Route path="profiles/:id" element={<Profile />}>
					<Route path="friends" element={<FriendsList />} />
					<Route path="requests" element={<FriendRequests />} />
					<Route path="posts" element={<ProfilePosts />} />
				</Route>
				<Route path="notes" element={<Notes />} />
				<Route path="trends" element={<Trends />}>
					<Route path="all" element={<AllTrends />} />
					<Route path="priority" element={<PriorityTrends />} />
					<Route path="blocked" element={<BlockedTrends />} />
					<Route path=":id" element={<Trend />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
