import { Link } from 'react-router-dom';

import formatDate from '../../../../helpers/formatCreationDate';
import getDuration from '../../../../helpers/getCourseDuration';

import style from './CourseCard.module.scss';
import Button from '../../../../common/Button/Button';

import { IAuthor, ICourse } from '../../Courses';

import getAuthors from '../../../../helpers/getCourseAuthors';

interface CourseCardProps {
	course: ICourse;
	authors: IAuthor[];
}

const CourseCard: React.FC<CourseCardProps> = ({ course, authors }) => {
	return (
		<div className={style.container}>
			<div className={style.wrapper}>
				<div className={style.leftSection}>
					<h2 className={style.title}>{course.title}</h2>
					<article className={style.description}>{course.description}</article>
				</div>

				<div className={style.rightSection}>
					<div className={style.metadata}>
						<p className={style.authors}>
							<b>Authors: </b>
							{getAuthors(course.authors, authors)}
						</p>

						<p className={style.duration}>
							<b>Duration: </b>
							{getDuration(course.duration)}
						</p>

						<p className={style.creationDate}>
							<b>Created: </b>
							{formatDate(course.creationDate)}
						</p>
					</div>

					<Link to={`/courses/${course.id}`}>
						<Button
							className={`button ${style.button}`}
							buttonText={'show course'}
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
