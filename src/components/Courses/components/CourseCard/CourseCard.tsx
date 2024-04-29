import formatDate from '../../../../helpers/formatCreationDate';
import getDuration from '../../../../helpers/getCourseDuration';

import style from './CourseCard.module.scss';
import Button from '../../../../common/Button/Button';

import { IAuthors, ICourses } from '../../Courses';

import getAuthors from '../../../../helpers/getCourseAuthors';

export default function CourseCard({
	course,
	authors,
	onClick,
}: {
	course: ICourses;
	authors: IAuthors[];
	onClick: () => void;
}) {
	return (
		<>
			<div className={style.courseCard}>
				<div className={style.info}>
					<h2 className={style.title}>{course.title}</h2>
					<article className={style.description}>{course.description}</article>
				</div>
				<div className={style.data}>
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
					<Button
						className={'button ' + style.button}
						buttonText={'show course'}
						onClick={() => {
							onClick();
						}}
					></Button>
				</div>
			</div>
		</>
	);
}
