import { useState } from 'react';
import {
	Link,
	Navigate,
	Outlet,
	useLocation,
	useNavigate,
} from 'react-router-dom';

import style from './Courses.module.scss';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from '../../common/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import {
	copyCoursesList as courses,
	copytAuthorsList as authors,
} from '../CreateCourse/components/Authors/Authors';

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

const Courses: React.FC = () => {
	const [searchResults, setSearchResults] = useState<ICourse[]>(courses);

	const handleSearch = (query: string) => {
		if (!query) {
			setSearchResults(courses);
			return;
		}

		const queryLowerCase = query.toLowerCase();

		const filteredCourses = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(queryLowerCase) ||
				course.id.toLowerCase().includes(queryLowerCase)
		);
		setSearchResults(filteredCourses.length ? filteredCourses : courses);
	};
	return (
		<div className={style.courses}>
			{searchResults.length ? (
				<div>
					<div className={style.coursesTop}>
						<SearchBar onSearch={handleSearch} />
						<Link to='/courses/add'>
							<Button
								className={style.addCourseBtn}
								buttonText='add new course'
							/>
						</Link>
					</div>
					{searchResults.map((course) => (
						<CourseCard key={course.id} course={course} authors={authors} />
					))}
				</div>
			) : (
				<EmptyCourseList />
			)}
		</div>
	);
};

export default Courses;
