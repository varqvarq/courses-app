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
			<Route path='/' element={<Navigate to='/courses' />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Registration />} />
			<Route path='/courses' element={<PrivateRoute />}>
				<Route path='' element={<Courses />}>
					<Route path='add' element={<CreateCourse />} />
					<Route path=':courseId' element={<CourseInfo />} />
				</Route>
			</Route>
			<Route path='*' element={<Navigate to='/courses' />} />
		</Routes>
	</div>
);

export default App;
