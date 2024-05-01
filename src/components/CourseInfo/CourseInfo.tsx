import React from 'react';

import { ICourse } from '../Courses/Courses';

import { mockedAuthorsList, mockedCoursesList } from '../../constant';

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

	return (
		<>
			{course && (
				<div className={style.courseInfo}>
					<h2 className={style.title}>{course.title}</h2>

					<div className={style.infocard}>
						<div className={style.leftSection}>
							<p className={style.label}>Description: </p>
							<br></br>
							<article className={style.descriptionText}>
								{course.description}
							</article>
						</div>

						<div className={style.divider}></div>

						<div className={style.rightSection}>
							<div className={style.column}>
								<p className={style.label}>ID:</p>
								<p className={style.label}>Duration:</p>
								<p className={style.label}>Created:</p>
								<p className={style.label}>Authors:</p>
							</div>

							<div className={style.column}>
								<p className={style.value}>{formatId(course.id)}</p>
								<p className={style.value}>
									<b>{getDuration(course.duration).split(' ')[0]} </b>
									{getDuration(course.duration).split(' ')[1]}
								</p>
								<p className={style.value}>{formatDate(course.creationDate)}</p>
								<p className={style.value}>
									{getAuthors(course.authors, mockedAuthorsList)}
								</p>
							</div>
						</div>
					</div>

					<Button
						className={`button ${style.button}`}
						buttonText={'back'}
						onClick={hideCourseInfo}
					/>
				</div>
			)}
		</>
	);
};

function findCourse(courseId: string): ICourse | undefined {
	if (mockedCoursesList && mockedCoursesList.length > 0) {
		return mockedCoursesList.find((course: ICourse) => {
			return course.id === courseId;
		});
	}
	return;
}

function formatId(id: string) {
	return id.split('-').slice(0, 3).join('-');
}

export default CourseInfo;
