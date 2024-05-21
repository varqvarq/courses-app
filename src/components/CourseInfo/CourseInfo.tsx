import { Link, useParams } from 'react-router-dom';

import style from './CourseInfo.module.scss';

import {
	copytAuthorsList as authors,
	copyCoursesList as courses,
} from '../CreateCourse/CreateCourse';

import {
	getDuration,
	formatDate,
	getAuthors,
	findCourse,
	formatId,
} from '../../helpers';

import Button from '../../common/Button/Button';

const CourseInfo: React.FC = () => {
	const params = useParams();
	const courseId = params.courseId;

	const course = findCourse(courseId, courses);

	if (!course) {
		return null;
	}

	return (
		<div className={style.courseInfo}>
			<h2 className={style.title}>{course.title}</h2>

			<div className={style.content}>
				<div className={style.leftSection}>
					<p className={style.label}>Description: </p>
					<br />
					<article className={style.descriptionText}>
						{course.description}
					</article>
				</div>

				<div className={style.divider}></div>

				<div className={style.rightSection}>
					<p className={style.label}>ID:</p>
					<p className={style.label}>Duration:</p>
					<p className={style.label}>Created:</p>
					<p className={style.label}>Authors:</p>

					<p className={style.value}>{formatId(course.id)}</p>
					<p className={style.value}>
						<b>{getDuration(course.duration).split(' ')[0]} </b>
						{getDuration(course.duration).split(' ')[1]}
					</p>
					<p className={style.value}>{formatDate(course.creationDate)}</p>
					<p className={style.value}>{getAuthors(course.authors, authors)}</p>
				</div>
			</div>
			<Link className={style.buttonLink} to='/'>
				<Button className={style.button} buttonText={'back'} />
			</Link>
		</div>
	);
};

export default CourseInfo;
