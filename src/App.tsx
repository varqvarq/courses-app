import React, { StrictMode } from 'react';
import style from './App.module.scss';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';

import { mockedCoursesList, mockedAuthorsList } from './constant';

const App: React.FC = () => (
	<div className={style.app}>
		<Header />
		<Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
	</div>
);

export default App;
