import { useState } from 'react';

import style from './Courses.module.scss';

import CourseCard from './components/CourseCard/CourseCard';
import CourseInfo, { findCourse } from '../CourseInfo/CourseInfo';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

export interface ICourses {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface IAuthors {
	id: string;
	name: string;
}

export default function Courses({
	courses,
	authors,
}: {
	courses: ICourses[];
	authors: IAuthors[];
}) {
	const [courseShow, setCourseShow] = useState(true);
	const [courseId, setCourseId] = useState('');

	function handleClick(course: ICourses) {
		setCourseShow(!courseShow);
		setCourseId(course.id);
	}

	return (
		<div className={style.courses}>
			{courses &&
				courseShow &&
				courses.map((course) => {
					return (
						<CourseCard
							key={course.id}
							course={course}
							authors={authors}
							onClick={() => {
								handleClick(course);
							}}
						/>
					);
				})}
			{courses && !courseShow && (
				<CourseInfo
					courseId={courseId}
					onClick={() => setCourseShow(!courseShow)}
				/>
			)}
		</div>
	);
}
