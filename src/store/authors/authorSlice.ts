import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthorType {
	id: string;
	name: string;
}

export interface AuthorTypeNew {
	name: string;
}

const initauthorsState = [] as AuthorType[];

export const fetchAuthors = createAsyncThunk<AuthorType[]>(
	'authors/fetchAuthors',
	async (_, { rejectWithValue }) => {
		const response = await fetch('http://localhost:4000/authors/all');

		if (!response.ok) {
			return rejectWithValue('server error!');
		}

		const data = await response.json();

		return data.result;
	}
);

const token = localStorage.getItem('userToken');

export const addAuthorToServer = createAsyncThunk<AuthorType, AuthorTypeNew>(
	'authors/addAuthorToServer',
	async (author, { rejectWithValue }) => {
		const response = await fetch('http://localhost:4000/authors/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token ? token : '',
			},
			body: JSON.stringify(author),
		});

		if (!response.ok) {
			return rejectWithValue('server error!');
		}

		const data = await response.json();

		return data.result;
	}
);

export const removeAuthorFromServer = createAsyncThunk<void, string>(
	'authors/removeAuthorFromServer',
	async (authorId, { rejectWithValue }) => {
		const response = await fetch(`http://localhost:4000/authors/${authorId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token ? token : '',
			},
			body: JSON.stringify(authorId),
		});

		if (!response.ok) {
			return rejectWithValue('server error!');
		}
	}
);

export const authorSlice = createSlice({
	name: 'authors',
	initialState: initauthorsState,
	reducers: {
		addAuthor: (state, action: PayloadAction<AuthorType>) => {
			state.push(action.payload);
		},
		removeAuthor: (state, action: PayloadAction<string>) => {
			return state.filter((author) => author.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAuthors.fulfilled, (state, action) => {
			return action.payload;
		});
		builder.addCase(addAuthorToServer.fulfilled, (state, action) => {
			state.push(action.payload);
		});
		builder.addCase(removeAuthorFromServer.fulfilled, (state, action) => {
			return state;
		});
	},
});

export const { addAuthor, removeAuthor } = authorSlice.actions;
export const selectAuthors = (state: RootState) => state.authors;

export default authorSlice.reducer;
