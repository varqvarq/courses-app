import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';

import style from './EmptyCourseList.module.scss';

const EmptyCourseList: React.FC = () => {
	return (
		<>
			<div className={style.container}>
				<h2 className={style.heading}>Course List is Empty</h2>
				<h3 className={style.subheading}>
					Please use "Add New Course" button to add your first course
				</h3>
				<Link to={'/courses/add'}>
					<Button
						className={`button ${style.button}`}
						buttonText='Add New Course'
						onClick={() => console.log()}
					/>
				</Link>
			</div>
		</>
	);
};

export default EmptyCourseList;
