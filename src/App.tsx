import React, { StrictMode } from 'react';
import style from './App.module.scss';

import CreateCourse, {
	copyMockedCoursesList,
	copyMockedAuthorsList,
} from './components/CreateCourse/CreateCourse';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';

import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

const App: React.FC = () => (
	<div className={style.app}>
		<Header />
		{/* {/* <Registration />
		<Login /> */}
		<CreateCourse />
		{copyMockedCoursesList.length === 0 && <EmptyCourseList />}
		<Courses courses={copyMockedCoursesList} authors={copyMockedAuthorsList} />
	</div>
);

export default App;
