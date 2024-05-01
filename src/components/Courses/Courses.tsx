import { useState } from 'react';

import style from './Courses.module.scss';

import CourseCard from './components/CourseCard/CourseCard';
import CourseInfo from '../CourseInfo/CourseInfo';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

export interface ICourse {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface IAuthor {
	id: string;
	name: string;
}

interface CoursesProps {
	courses: ICourse[];
	authors: IAuthor[];
}

const Courses: React.FC<CoursesProps> = ({ courses, authors }) => {
	const [courseId, setCourseId] = useState('');

	function handleClick(id: string) {
		setCourseId(id);
	}

	if (courses.length === 0) {
		return <EmptyCourseList />;
	}

	return (
		<div className={style.courses}>
			{courseId ? (
				<CourseInfo
					courseId={courseId}
					hideCourseInfo={() => handleClick('')}
				/>
			) : (
				courses.map((course) => {
					return (
						<CourseCard
							key={course.id}
							course={course}
							authors={authors}
							showCourseInfo={() => {
								handleClick(course.id);
							}}
						/>
					);
				})
			)}
		</div>
	);
};

export default Courses;
