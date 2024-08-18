import { useEffect, useState } from 'react';
import './App.css';
import Details from './components/Details/Details';
import List from './components/List/List';

function App() {
	const [usersData, setUsersData] = useState<{ id: number; name: string }[]>(
		[]
	);
	const [selectedUser, setSelectedUser] = useState<{
		id: number;
		name: string;
	}>();

	const changeUser = (user: { id: number; name: string }) => {
		setSelectedUser(user);
	};

	const getData = async (url: string) => {
		const response = await fetch(url);
		const data = await response.json();

		return data;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getData(
					'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'
				);
				if (data) {
					setUsersData(data);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<List data={usersData} setData={changeUser} />
			{selectedUser && <Details info={selectedUser} />}
		</>
	);
}

export default App;
