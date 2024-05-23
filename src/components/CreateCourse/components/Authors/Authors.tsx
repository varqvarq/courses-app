import { useState } from 'react';

import style from './Authors.module.scss';

import CreateAuthor from './CreateAuthor/CreateAuthor';

import { IAuthor, ICourse } from '../../../Courses/Courses';
import AuthorsList from './AuthorsList/AuthorsList';
import CourseAuthorsList from './CourseAuthorsList/CourseAuthorsList';

import {
	mockedCoursesList as courses,
	mockedAuthorsList as authors,
} from '../../../../constant';

export const copyCoursesList: ICourse[] = courses;
export const copytAuthorsList: IAuthor[] = authors;

interface AuthorsProps {
	courseAuthors: IAuthor[];
	setCourseAuthors: React.Dispatch<React.SetStateAction<IAuthor[]>>;
	onError: boolean;
}

const Authors: React.FC<AuthorsProps> = ({
	courseAuthors,
	setCourseAuthors,
	onError,
}) => {
	const [authors, setAuthors] = useState<IAuthor[]>(copytAuthorsList);

	const handleCreation = (author: IAuthor) => {
		if (!authors.includes(author)) {
			setAuthors([...authors, author]);
		}
	};

	const handleAuthorRemove = (id: string) => {
		setAuthors((prev) => prev.filter((author) => author.id !== id));
	};

	const handleCourseAuthorAdd = (id: string) => {
		const newCourseAuthor = authors.find((author) => author.id === id);

		if (newCourseAuthor && !courseAuthors.includes(newCourseAuthor)) {
			handleAuthorRemove(id);
			setCourseAuthors([...courseAuthors, newCourseAuthor]);
		}
	};

	const handleCourseAuthorRemove = (id: string) => {
		setCourseAuthors((prev) =>
			prev.filter((courseAuthor) => courseAuthor.id !== id)
		);

		const removedCourseAuthor = copytAuthorsList.find(
			(author) => author.id === id
		);

		removedCourseAuthor && handleCreation(removedCourseAuthor);
	};

	return (
		<div className={style.authorsContainer}>
			<div className={style.authorList}>
				<h3 className={style.subheading}>Authors</h3>

				<CreateAuthor onCreate={handleCreation} />

				<AuthorsList
					authors={authors}
					onRemove={handleAuthorRemove}
					onAdd={handleCourseAuthorAdd}
				/>
			</div>

			<CourseAuthorsList
				courseAuthors={courseAuthors}
				onRemove={handleCourseAuthorRemove}
				onError={onError}
			/>
		</div>
	);
};

export default Authors;
