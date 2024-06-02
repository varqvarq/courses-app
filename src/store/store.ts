import { configureStore } from '@reduxjs/toolkit';
import courseSlice from './courses/coursesSlice';
import authorSlice from './authors/authorSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
	reducer: {
		courses: courseSlice.reducer,
		authors: authorSlice.reducer,
		user: userSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
