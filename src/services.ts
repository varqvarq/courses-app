// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const dataApi = createApi({
// 	reducerPath: dataApi,
// 	baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:4'})
// });

const API_URL = 'http://localhost:4000';

export const getCourses = async () => {
	try {
		const response = await fetch(`${API_URL}/courses/all`);
		if (response.ok) {
			const data = await response.json();
			return data.result;
		}
	} catch (e) {
		alert(e);
	}
};

export const getAuthors = async () => {
	try {
		const response = await fetch(`${API_URL}/authors/all`);
		if (response) {
			const data = await response.json();
			return data.result;
		}
	} catch (e) {
		alert(e);
	}
};
