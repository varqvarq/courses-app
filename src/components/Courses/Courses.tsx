import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import style from './Courses.module.scss';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from '../../common/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import { useAppSelector, useAppDispatch } from '../../hooks/useTypedSelector';

import { CourseType, selectCourses } from '../../store/courses/coursesSlice';
import { selectAuthors } from '../../store/authors/authorSlice';
import { fetchUser, selectUser } from '../../store/user/userSlice';

const Courses: React.FC = () => {
	const { list, status } = useAppSelector(selectCourses);
	const courses = list;
	const authors = useAppSelector(selectAuthors);
	const userData = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const location = useLocation();
	const navigate = useNavigate();
	const [searchResults, setSearchResults] = useState<CourseType[]>(courses);

	const isCourses = location.pathname === '/courses';

	useEffect(() => {
		const token = localStorage.getItem('userToken');
		if (token) dispatch(fetchUser(token));
	}, [dispatch]);

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
	console.log(status);
	return (
		<div className={style.courses}>
			<div className={style.wrapper}>
				{isCourses && (
					<div className={style.coursesTop}>
						<SearchBar onSearch={handleSearch} />
						{userData.role === 'admin' && (
							<Button
								className={style.addCourseBtn}
								buttonText='add new course'
								onClick={() => {
									navigate('/courses/add');
								}}
							/>
						)}
					</div>
				)}
				{status === 'pending' && <h2>Loading...</h2>}
				{isCourses && status === 'fulfilled' && searchResults.length === 0 && (
					<EmptyCourseList />
				)}
				{isCourses && status === 'fulfilled' && searchResults.length > 0 && (
					<>
						{searchResults.map((course) => (
							<CourseCard key={course.id} course={course} authors={authors} />
						))}
					</>
				)}
				{!isCourses && <Outlet />}
			</div>
		</div>
	);
	// return (
	// 	<div className={style.courses}>
	// 		{isCourses ? (
	// 			<>
	// 				{searchResults.length ? (
	// 					<div className={style.wrapper}>
	// 						<div className={style.coursesTop}>
	// 							<SearchBar onSearch={handleSearch} />
	// 							{userData.role === 'admin' && (
	// 								<Button
	// 									className={style.addCourseBtn}
	// 									buttonText='add new course'
	// 									onClick={() => {
	// 										navigate('/courses/add');
	// 									}}
	// 								/>
	// 							)}
	// 						</div>
	// 						{status === 'pending' ? (
	// 							<h2>Loading.......</h2>
	// 						) : (
	// 							searchResults.map((course) => (
	// 								<CourseCard
	// 									key={course.id}
	// 									course={course}
	// 									authors={authors}
	// 								/>
	// 							))
	// 						)}
	// 						{}
	// 					</div>
	// 				) : (
	// 					<EmptyCourseList />
	// 				)}
	// 			</>
	// 		) : (
	// 			<Outlet />
	// 		)}
	// 	</div>
	// );
};

export default Courses;
