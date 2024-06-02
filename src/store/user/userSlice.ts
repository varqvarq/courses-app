import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserType {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
}

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
} as UserType;

const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserType>) => {
			return action.payload;
		},
		removeUser: (state) => {
			return userInitialState;
		},
	},
});

export const selectUser = (state: RootState) => state.user;

export const { setUser, removeUser } = userSlice.actions;
export default userSlice;
