import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import style from './App.module.scss';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseForm from './components/CourseForm/CourseForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useAppDispatch } from './hooks/useTypedSelector';
import { fetchCourses } from './store/courses/coursesSlice';
import { fetchAuthors } from './store/authors/authorSlice';

const App: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCourses());
		dispatch(fetchAuthors());
	}, [dispatch]);

	return (
		<div className={style.app}>
			<Header />
			<Routes>
				<Route path='/' element={<Navigate to='/courses' />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Registration />} />

				<Route element={<PrivateRoute />}>
					<Route path='/courses' element={<Courses />}>
						<Route path='/courses/:courseId' element={<CourseInfo />} />
					</Route>
				</Route>
				<Route element={<PrivateRoute role='admin' />}>
					<Route path='/courses' element={<Courses />}>
						<Route path='/courses/add' element={<CourseForm />} />
						<Route path='/courses/update/:courseId' element={<CourseForm />} />
					</Route>
				</Route>

				<Route path='*' element={<Navigate to='/courses' />} />
			</Routes>
		</div>
	);
};

export default App;
