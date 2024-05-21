import { IAuthor } from '../components/Courses/Courses';

const getAuthors = (courseAuthors: string[], authors: IAuthor[]): string => {
	return courseAuthors
		.map((courseAuthor) => {
			const author = authors.find((author) => {
				return author.id === courseAuthor;
			});
			return author ? author.name : '';
		})
		.join(', ');
};

export default getAuthors;
