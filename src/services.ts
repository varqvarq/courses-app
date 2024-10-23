import { CourseType, CourseTypeNew } from './store/courses/coursesSlice';

const API_URL = 'http://localhost:4000';
const token = localStorage.getItem('userToken');

export const serverAPI = {
	courses: {
		async getCourses() {
			try {
				const response = await fetch(`${API_URL}/courses/all`);

				if (!response.ok) {
					throw new Error(`Failed to fetch courses: ${response.statusText}`);
				}

				const data = await response.json();
				return data.result;
			} catch (error) {
				console.error('Failed to fetch courses:', error);
				throw error;
			}
		},

		async addCourse(course: CourseTypeNew) {
			try {
				const response = await fetch('http://localhost:4000/courses/add', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token ? token : '',
					},
					body: JSON.stringify(course),
				});

				if (!response.ok) {
					throw new Error(`Failed to add course: ${response.statusText}`);
				}

				const data = await response.json();

				return data.result;
			} catch (error) {
				console.error('Failed to add course: ', error);
				throw error;
			}
		},
		async editCourse(course: CourseType) {
			try {
				const response = await fetch(
					`http://localhost:4000/courses/${course.id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: token ? token : '',
						},
						body: JSON.stringify(course),
					}
				);

				if (!response.ok) {
					throw new Error(`Failed to remove course: ${response.statusText}`);
				}

				const data = await response.json();

				return data.result;
			} catch (error) {
				console.error('Failed to edit course: ', error);
			}
		},
		async removeCourse(courseId: string) {
			try {
				const response = await fetch(
					`http://localhost:4000/courses/${courseId}`,
					{
						method: 'DELETE',
						headers: {
							Authorization: token ? token : '',
						},
						body: JSON.stringify(courseId),
					}
				);

				const data = await response.json();
				return data.result;
			} catch (e) {
				console.error('Failed to remove course');
			}
		},
	},

	authors: {
		async getAuthors() {
			try {
				const response = await fetch(`${API_URL}/authors/all`);

				if (!response.ok) {
					throw new Error(`Failed to fetch courses: ${response.statusText}`);
				}

				const data = await response.json();
				return data.result;
			} catch (error) {
				console.error('Failed to fetch authors:', error);
				throw error;
			}
		},
	},
};
