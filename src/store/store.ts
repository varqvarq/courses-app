import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/coursesSlice';
import authorsReducer from './authors/authorSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
	reducer: {
		courses: coursesReducer,
		authors: authorsReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
