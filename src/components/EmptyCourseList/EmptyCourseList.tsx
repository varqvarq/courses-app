import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';

import style from './EmptyCourseList.module.scss';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { selectUser } from '../../store/user/userSlice';

const EmptyCourseList: React.FC = () => {
	const userInfo = useAppSelector(selectUser);

	return (
		<>
			<div className={style.container}>
				<h2 className={style.heading}>Course List is Empty</h2>
				{userInfo.role === 'admin' ? (
					<>
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
					</>
				) : (
					<h3 className={style.subheading}>
						You don't have permissions to create a course. Please log in as
						ADMIN
					</h3>
				)}
			</div>
		</>
	);
};

export default EmptyCourseList;
