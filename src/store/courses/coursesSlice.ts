import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

export interface CourseType {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

const initCoursesState = [] as CourseType[];

export const courseSlice = createSlice({
	name: 'courses',
	initialState: initCoursesState,
	reducers: {
		saveCourses: (state, action: PayloadAction<CourseType[]>) => {
			return action.payload;
		},
		addCourse: (state, action: PayloadAction<CourseType>) => {
			state.push(action.payload);
		},
		removeCourse: (state, action: PayloadAction<string>) => {
			return state.filter((course) => course.id !== action.payload);
		},
	},
});

export const { saveCourses, addCourse, removeCourse } = courseSlice.actions;
export const selectCourses = (state: RootState) => state.courses;

export default courseSlice;
