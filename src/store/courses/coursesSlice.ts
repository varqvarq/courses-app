import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { serverAPI } from '../../services';

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

interface ICoursesState {
	list: CourseType[];
	status?: string;
	error?: string;
}

const initCoursesState: ICoursesState = {
	list: [] as CourseType[],
	status: 'pending',
	error: '',
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchCourses = createAsyncThunk<CourseType[]>(
	'courses/fetchCourses',
	async (_, thunkApi) => {
		try {
			await delay(3000);
			const response = await serverAPI.courses.getCourses();
			return response;
		} catch (e: any) {
			return thunkApi.rejectWithValue({ error: e.message });
		}
	}
);

export const addCourseToServer = createAsyncThunk<CourseType, CourseTypeNew>(
	'courses/addCourseToServer',
	async (course, thunkApi) => {
		try {
			return await serverAPI.courses.addCourse(course);
		} catch (e: any) {
			return thunkApi.rejectWithValue({ error: e.message });
		}
	}
);

export const editCourseOnServer = createAsyncThunk<CourseType, CourseType>(
	'courses/editCourseOnServer',
	async (course, thunkApi) => {
		try {
			return await serverAPI.courses.editCourse(course);
		} catch (e: any) {
			return thunkApi.rejectWithValue({ error: e.message });
		}
	}
);

export const removeCourseFromServer = createAsyncThunk<void, string>(
	'courses/removeCourseFromServer',
	async (courseId, thunkApi) => {
		try {
			return await serverAPI.courses.removeCourse(courseId);
		} catch (e: any) {
			return thunkApi.rejectWithValue({ error: e.message });
		}
	}
);

export const courseSlice = createSlice({
	name: 'courses',
	initialState: initCoursesState,
	reducers: {
		saveCourses: (state, action: PayloadAction<CourseType[]>) => {
			state.list = action.payload;
		},
		addCourse: (state, action: PayloadAction<CourseType>) => {
			state.list.push(action.payload);
		},
		removeCourse: (state, action: PayloadAction<string>) => {
			state.list = state.list.filter((course) => course.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCourses.pending, (state) => {
			state.status = 'pending';
		});
		builder.addCase(fetchCourses.fulfilled, (state, action) => {
			state.list = action.payload;
			state.status = 'fulfilled';
		});
		builder.addCase(addCourseToServer.fulfilled, (state, action) => {
			state.list.push(action.payload);
		});
		builder.addCase(removeCourseFromServer.fulfilled, (state) => {
			return state;
		});
		builder.addCase(editCourseOnServer.fulfilled, (state, action) => {
			const editedCourse = action.payload;
			return state.list.forEach((course) => {
				if (course.id === editedCourse.id) {
					return editedCourse;
				}
				return course;
			});
		});
	},
});

export const { saveCourses, addCourse, removeCourse } = courseSlice.actions;
export const selectCourses = (state: RootState) => state.courses;

export default courseSlice.reducer;
