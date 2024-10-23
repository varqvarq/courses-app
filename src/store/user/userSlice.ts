import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserType {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
}

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
} as UserType;

export const fetchUser = createAsyncThunk(
	'courses/fetchUser',
	async (token: string, { rejectWithValue }) => {
		const response = await fetch('http://localhost:4000/users/me', {
			headers: {
				Authorization: token,
			},
		});

		if (!response.ok) {
			return rejectWithValue('server error!');
		}

		const data = await response.json();

		return data.result;
	}
);

export const removeUserFromServer = createAsyncThunk(
	'courses/removeUserFromServer',
	async (token: string, { rejectWithValue }) => {
		const response = await fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});

		if (!response.ok) {
			return rejectWithValue('server error!');
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		setUser: (_, action: PayloadAction<UserType>) => {
			return action.payload;
		},
		removeUser: () => {
			return userInitialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.isAuth = true;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.role = action.payload.role;
		});
		builder.addCase(removeUserFromServer.fulfilled, () => {
			return userInitialState;
		});
	},
});

export const selectUser = (state: RootState) => state.user;

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
