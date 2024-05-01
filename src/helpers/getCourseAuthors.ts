import { IAuthor } from '../components/Courses/Courses';

export default function getAuthors(
	courseAuthors: string[],
	authors: IAuthor[]
): string {
	return courseAuthors
		.map((courseAuthor) => {
			const author = authors.find((author) => {
				return author.id === courseAuthor;
			});
			return author ? author.name : '';
		})
		.join(', ');
}
