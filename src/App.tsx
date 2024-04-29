import React from 'react';
import style from './App.module.scss';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';

import { mockedCoursesList, mockedAuthorsList } from './constant';

function App() {
	return (
		<div className={style.app}>
			<Header />

			<Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
		</div>
	);
}

export default App;
