import {
	PayloadAction,
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface CourseType {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface CourseTypeNew {
	title: string;
	description: string;
	duration: number;
	authors: string[];
}

const initCoursesState = [] as CourseType[];
const token = localStorage.getItem('userToken');

export const fetchCourses = createAsyncThunk<CourseType[]>(
	'courses/fetchCourses',
	async (_, { rejectWithValue }) => {
		const response = await fetch('http://localhost:4000/courses/all');

		if (!response.ok) {
			return rejectWithValue('server error!');
		}

		const data = await response.json();

		return data.result;
	}
);

export const addCourseToServer = createAsyncThunk<CourseType, CourseTypeNew>(
	'courses/addCourseToServer',
	async (course, { rejectWithValue }) => {
		const response = await fetch('http://localhost:4000/courses/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token ? token : '',
			},
			body: JSON.stringify(course),
		});

		if (!response.ok) {
			return rejectWithValue('server error!');
		}

		const data = await response.json();

		return data.result;
	}
);

export const editCourseOnServer = createAsyncThunk<CourseType, CourseType>(
	'courses/editCourseOnServer',
	async (course, { rejectWithValue }) => {
		const response = await fetch(`http://localhost:4000/courses/${course.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token ? token : '',
			},
			body: JSON.stringify(course),
		});
		const data = await response.json();

		return data.result;
	}
);

export const removeCourseFromServer = createAsyncThunk<void, string>(
	'courses/removeCourseFromServer',
	async (courseId, { rejectWithValue }) => {
		const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token ? token : '',
			},
			body: JSON.stringify(courseId),
		});

		if (!response.ok) {
			return rejectWithValue('server error!');
		}
	}
);

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
		editCourse: (state, action: PayloadAction<CourseType>) => {
			const editedCourse = action.payload;
			const index = state.findIndex((course) => course.id === editedCourse.id);
			if (index !== -1) {
				state[index] = editedCourse;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCourses.fulfilled, (state, action) => {
			return action.payload;
		});
		builder.addCase(addCourseToServer.fulfilled, (state, action) => {
			state.push(action.payload);
		});
		builder.addCase(removeCourseFromServer.fulfilled, (state, action) => {
			return state;
		});
		builder.addCase(editCourseOnServer.fulfilled, (state, action) => {
			const editedCourse = action.payload;
			const index = state.findIndex((course) => course.id === editedCourse.id);
			if (index !== -1) {
				state[index] = editedCourse;
			}
		});
	},
});

export const { saveCourses, addCourse, removeCourse, editCourse } =
	courseSlice.actions;
export const selectCourses = (state: RootState) => state.courses;

export default courseSlice.reducer;
