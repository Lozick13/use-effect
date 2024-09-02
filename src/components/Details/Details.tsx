import { FC, useEffect, useState } from 'react';
import classes from './details.module.css';

const Details: FC<{ info: { id: number; name: string } }> = ({ info }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [details, setDetails] = useState<
		| {
				id: number;
				name: string;
				avatar: string;
				details: {
					city: string;
					company: string;
					position: string;
				};
		  }
		| undefined
	>();

	const getData = async (url: string) => {
		const response = await fetch(url);
		const data = await response.json();

		return data;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getData(
					`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
				);
				if (data) {
					setDetails(data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		setLoading(true);
		setDetails(undefined);
		fetchData();
	}, [info.id]);

	return (
		<>
			{loading && <>Загрузка...</>}

			<ul
				style={{ display: loading ? 'none' : 'block' }}
				className={classes['details']}
			>
				<li>
					<img
						className={classes['details__image']}
						onLoad={() => setLoading(false)}
						src={details?.avatar}
						alt={details?.name + '-avatar'}
					/>
				</li>
				<li>{details?.name}</li>
				<li>{details?.details.city}</li>
				<li>{details?.details.company}</li>
				<li>{details?.details.position}</li>
			</ul>
		</>
	);
};

export default Details;
