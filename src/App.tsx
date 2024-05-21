import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import style from './App.module.scss';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CreateCourse from './components/CreateCourse/CreateCourse';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App: React.FC = () => (
	<div className={style.app}>
		<Header />
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/registration' element={<Registration />} />
			<Route path='/courses/add' element={<CreateCourse />} />
			<Route path='/courses/:courseId' element={<CourseInfo />} />
			<Route
				path='/'
				element={
					<PrivateRoute>
						<Courses />
					</PrivateRoute>
				}
			/>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	</div>
);

export default App;
