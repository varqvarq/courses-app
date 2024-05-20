import { useState } from 'react';

import style from './Courses.module.scss';

import CourseCard from './components/CourseCard/CourseCard';
import CourseInfo from '../CourseInfo/CourseInfo';
import SearchBar from '../../common/SearchBar/SearchBar';

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
	const [searchResults, setSearchResults] = useState<ICourse[]>(courses);

	function handleClick(id: string) {
		setCourseId(id);
	}

	function handleSearch(query: string) {
		if (!query) {
			setSearchResults(courses);
			return;
		}

		const filteredCourses = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(query.toLowerCase()) ||
				course.id.toLowerCase().includes(query.toLowerCase())
		);
		setSearchResults(filteredCourses);
	}

	return (
		<div className={style.courses}>
			{courseId ? (
				<CourseInfo
					courseId={courseId}
					hideCourseInfo={() => handleClick('')}
				/>
			) : (
				<>
					<SearchBar onSearch={handleSearch} />

					{searchResults.map((course) => {
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
					})}
				</>
			)}
		</div>
	);
};

export default Courses;
