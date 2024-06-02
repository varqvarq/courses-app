import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthorType {
	id: string;
	name: string;
}

const initCoursesState = [] as AuthorType[];

export const authorSlice = createSlice({
	name: 'authors',
	initialState: initCoursesState,
	reducers: {
		saveAuthors: (state, action: PayloadAction<AuthorType[]>) => {
			return action.payload;
		},
		addAuthor: (state, action: PayloadAction<AuthorType>) => {
			state.push(action.payload);
		},
		removeAuthor: (state, action: PayloadAction<string>) => {
			state.filter((course) => course.id !== action.payload);
		},
	},
});

export const { saveAuthors, addAuthor, removeAuthor } = authorSlice.actions;
export const selectAuthors = (state: RootState) => state.authors;

export default authorSlice;
