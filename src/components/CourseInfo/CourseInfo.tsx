import React from 'react';

import { IAuthors, ICourses } from '../Courses/Courses';

import { mockedAuthorsList, mockedCoursesList } from '../../constant';

import getDuration from '../../helpers/getCourseDuration';
import formatDate from '../../helpers/formatCreationDate';
import getAuthors from '../../helpers/getCourseAuthors';

import Button from '../../common/Button/Button';

import style from './CourseInfo.module.scss';

export default function CourseInfo({
	courseId,
	onClick,
}: {
	courseId: string;
	onClick: () => void;
}) {
	console.log(courseId);
	const course = findCourse(courseId);
	return (
		<>
			<div className={style.courseInfo}>
				<h2 className={style.title}>{course?.title}</h2>

				<div className={style.infocard}>
					<div className={style.description}>
						<span className={style.fieldTitle}>Description: </span>
						<br></br>
						<article className={style.descriptionText}>
							{course?.description}
						</article>
					</div>

					<hr className={style.divider}></hr>

					<div className={style.info}>
						<p className={style.id}>
							<span className={style.fieldTitle}>ID: </span>
							{course?.id}
						</p>

						<p className={style.duration}>
							<span className={style.fieldTitle}>Duration: </span>

							{course?.duration ? getDuration(course.duration) : ''}
						</p>
						<p className={style.creationDate}>
							<span className={style.fieldTitle}>Created: </span>
							{course?.creationDate ? formatDate(course.creationDate) : ''}
						</p>
						<p className={style.authors}>
							<span className={style.fieldTitle}>Authors: </span>
							{course?.authors
								? getAuthors(course?.authors, mockedAuthorsList)
								: ''}
						</p>
					</div>
				</div>

				<Button
					className={'button ' + style.button}
					buttonText={'back'}
					onClick={() => {
						onClick();
					}}
				></Button>
			</div>
		</>
	);
}

export function findCourse(courseId: string): ICourses | undefined {
	if (mockedCoursesList && mockedCoursesList.length > 0) {
		return mockedCoursesList.find((course: any) => {
			return course.id === courseId;
		});
	} else {
		return;
	}
}
