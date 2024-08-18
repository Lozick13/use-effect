import { FC, useState } from 'react';
import classes from './list.module.css';

const List: FC<{
	data: { id: number; name: string }[];
	setData: (data: { id: number; name: string }) => void;
}> = ({ data, setData }) => {
	const [openAllItems, setOpenAllItems] = useState(false);

	return (
		<>
			<ul className={classes['list']}>
				{!openAllItems && (
					<>
						{data.slice(0, 3).map(({ id, name }) => (
							<li
								onClick={() => setData({ id, name })}
								className={classes['list__item']}
								key={id}
							>
								{name}
							</li>
						))}
						<li
							onClick={() => setOpenAllItems(true)}
							className={classes['list__item']}
						>
							. . .
						</li>
					</>
				)}
				{openAllItems &&
					data.map(({ id, name }) => (
						<li
							onClick={() => setData({ id, name })}
							className={classes['list__item']}
							key={id}
						>
							{name}
						</li>
					))}
			</ul>
		</>
	);
};

export default List;
