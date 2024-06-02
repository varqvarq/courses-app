import { AuthorType } from '../store/authors/authorSlice';

const findAuthors = (
	courseAuthors: string[],
	authors: AuthorType[]
): string => {
	return courseAuthors
		.map((courseAuthor) => {
			const author = authors.find((author) => {
				return author.id === courseAuthor;
			});
			return author ? author.name : '';
		})
		.join(', ');
};

export default findAuthors;
