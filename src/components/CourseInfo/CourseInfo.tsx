import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from './CourseInfo.module.scss';

import {
	getDuration,
	formatDate,
	findAuthors,
	findCourse,
	formatId,
} from '../../helpers';
import Button from '../../common/Button/Button';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { selectCourses } from '../../store/courses/coursesSlice';
import { selectAuthors } from '../../store/authors/authorSlice';

const CourseInfo: React.FC = () => {
	const { list } = useAppSelector(selectCourses);
	const authors = useAppSelector(selectAuthors);
	const courses = list;

	const navigate = useNavigate();
	const params = useParams();
	const courseId = params.courseId;

	const course = findCourse(courseId, courses);

	if (!course) {
		return null;
	}

	return (
		<div className={style.courseInfo}>
			<h2 className={style.title}>{course.title}</h2>

			<div className={style.wrapper}>
				<div className={style.content}>
					<div className={style.leftSection}>
						<p className={style.label}>Description:</p>
						<br />

						<article className={style.descriptionText}>
							{course.description}
						</article>
					</div>

					<div className={style.divider}></div>

					<div className={style.rightSection}>
						<p className={style.label}>ID:</p>
						<p className={style.value}>{formatId(course.id)}</p>

						<p className={style.label}>Duration:</p>
						<p className={style.value}>
							<b>{getDuration(course.duration).split(' ')[0]} </b>
							{getDuration(course.duration).split(' ')[1]}
						</p>
						<p className={style.label}>Created:</p>
						<p className={style.value}>{formatDate(course.creationDate)}</p>

						<p className={style.label}>Authors:</p>
						<p className={style.value}>
							{findAuthors(course.authors, authors)}
						</p>
					</div>
				</div>
			</div>
			<Button
				className={style.button}
				buttonText={'back'}
				onClick={() => navigate(-1)}
			/>
		</div>
	);
};

export default CourseInfo;
