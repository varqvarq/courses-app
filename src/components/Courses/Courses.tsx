import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import style from './Courses.module.scss';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from '../../common/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import { useAppSelector, useAppDispatch } from '../../hooks/useTypedSelector';

import { getAuthors, getCourses } from '../../services';
import {
	CourseType,
	saveCourses,
	selectCourses,
} from '../../store/courses/coursesSlice';
import { saveAuthors, selectAuthors } from '../../store/authors/authorSlice';

const Courses: React.FC = () => {
	const courses = useAppSelector(selectCourses);
	const authors = useAppSelector(selectAuthors);
	const dispatch = useAppDispatch();

	const location = useLocation();
	const navigate = useNavigate();
	const [searchResults, setSearchResults] = useState<CourseType[]>(courses);

	const isCourses = location.pathname == '/courses';

	useEffect(() => {
		const fetchData = async () => {
			const coursesData: CourseType[] = await getCourses();
			dispatch(saveCourses(coursesData));

			const authorsData = await getAuthors();
			dispatch(saveAuthors(authorsData));
		};
		fetchData();
	}, []);

	useEffect(() => {
		setSearchResults(courses);
	}, [courses]);

	const handleSearch = (query: string) => {
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
			{isCourses ? (
				<>
					{searchResults.length ? (
						<div className={style.wrapper}>
							<div className={style.coursesTop}>
								<SearchBar onSearch={handleSearch} />
								<Button
									className={style.addCourseBtn}
									buttonText='add new course'
									onClick={() => {
										navigate('/courses/add');
									}}
								/>
							</div>
							{searchResults.map((course) => (
								<CourseCard key={course.id} course={course} authors={authors} />
							))}
						</div>
					) : (
						<EmptyCourseList />
					)}
				</>
			) : (
				<Outlet />
			)}
		</div>
	);
};

export default Courses;
