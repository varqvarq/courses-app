import React from 'react';

import { ICourse } from '../Courses/Courses';
import {
	copyMockedAuthorsList,
	copyMockedCoursesList,
} from '../CreateCourse/CreateCourse';

import getDuration from '../../helpers/getCourseDuration';
import formatDate from '../../helpers/formatCreationDate';
import getAuthors from '../../helpers/getCourseAuthors';

import Button from '../../common/Button/Button';

import style from './CourseInfo.module.scss';

interface CourseInfoProps {
	courseId: string;
	hideCourseInfo: () => void;
}

const CourseInfo: React.FC<CourseInfoProps> = ({
	courseId,
	hideCourseInfo,
}) => {
	const course = findCourse(courseId);

	if (!course) {
		return null;
	}

	return (
		<div className={style.courseInfo}>
			<h2 className={style.title}>{course.title}</h2>

			<div className={style.content}>
				<div className={style.leftSection}>
					<p className={style.label}>Description: </p>
					<br></br>
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
					<p className={style.value}>
						{getAuthors(course.authors, copyMockedAuthorsList)}
					</p>
				</div>
			</div>

			<Button
				className={`button ${style.button}`}
				buttonText={'back'}
				onClick={hideCourseInfo}
			/>
		</div>
	);
};

function findCourse(courseId: string): ICourse | undefined {
	if (copyMockedCoursesList && copyMockedCoursesList.length > 0) {
		return copyMockedCoursesList.find((course: ICourse) => {
			return course.id === courseId;
		});
	}
	return;
}

function formatId(id: string) {
	return id.split('-').slice(0, 3).join('-');
}

export default CourseInfo;
