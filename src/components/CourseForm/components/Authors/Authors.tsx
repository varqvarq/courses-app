import { useState } from 'react';
import uuid from 'react-uuid';

import style from './Authors.module.scss';

import authorSlice, {
	AuthorType,
	AuthorTypeNew,
	addAuthor,
	addAuthorToServer,
	removeAuthor,
	removeAuthorFromServer,
	selectAuthors,
} from '../../../../store/authors/authorSlice';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import AuthorItem from './AuthorItem/AuthorItem';

import {
	useAppDispatch,
	useAppSelector,
} from '../../../../hooks/useTypedSelector';
import { CourseType } from '../../../../store/courses/coursesSlice';

interface AuthorsProps {
	courseAuthors: AuthorType[];
	setCourseAuthors: React.Dispatch<React.SetStateAction<AuthorType[]>>;
	onError: boolean;
	data: CourseType;
	setData: React.Dispatch<React.SetStateAction<CourseType>>;
}

const Authors: React.FC<AuthorsProps> = ({
	courseAuthors,
	setCourseAuthors,
	onError,
	data,
	setData,
}) => {
	const authors = useAppSelector(selectAuthors);
	const dispatch = useAppDispatch();

	const [authorName, setAuthorName] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAuthorName(e.target.value);
	};

	//создание и добавление автора
	const handleAuthorCreation = () => {
		if (!authorName.trim()) {
			setAuthorName('');
			return;
		}
		const newAuthor: AuthorTypeNew = {
			name: authorName,
		};

		dispatch(addAuthorToServer(newAuthor));
		setAuthorName('');
	};

	//удаление автора
	const handleAuthorRemove = (id: string) => {
		dispatch(removeAuthor(id));
		dispatch(removeAuthorFromServer(id));
	};

	//добавление автора курса
	const handleCourseAuthorAdd = (id: string) => {
		const newCourseAuthor = authors.find((author) => author.id === id);

		if (newCourseAuthor && !courseAuthors.includes(newCourseAuthor)) {
			setCourseAuthors([...courseAuthors, newCourseAuthor]);
			// setData({ ...data, authors: courseAuthors });
		}
	};

	//удаление автора курса
	const handleCourseAuthorRemove = (id: string) => {
		setCourseAuthors((prevCourseAuthors) =>
			prevCourseAuthors.filter((prevCourseAuthor) => prevCourseAuthor.id !== id)
		);
	};

	return (
		<div className={style.authorsContainer}>
			<div className={style.authorsList}>
				<h3 className={style.subheading}>Authors</h3>

				<Input
					inputId={'authorName'}
					labelText={'author name'}
					inputType={'text'}
					className={`${style.createAuthor}`}
					inputClassName={style.createAuthorInput}
					labelType={'small'}
					value={authorName}
					onChange={handleInputChange}
					wrap
					rightElement={
						<Button
							className={style.createAuthorButton}
							buttonText={'create author'}
							onClick={handleAuthorCreation}
						/>
					}
				/>
				<h4 className={style.authorsSubheading}>Authors List</h4>

				{authors.map((author) => {
					return (
						<AuthorItem
							key={author.id}
							authorName={author.name}
							onAdd={() => {
								handleCourseAuthorAdd(author.id);
							}}
							onRemove={() => handleAuthorRemove(author.id)}
						/>
					);
				})}
			</div>

			<div className={style.courseAuthorsList}>
				<h3 className={style.subheading}>Course Authors</h3>

				{courseAuthors.length ? (
					courseAuthors.map((courseAuthor) => {
						return (
							<AuthorItem
								key={courseAuthor.id}
								authorName={courseAuthor.name}
								onRemove={() => handleCourseAuthorRemove(courseAuthor.id)}
							/>
						);
					})
				) : (
					<p className={`${style.placeholder} ${onError && style.error}`}>
						Author list is empty
					</p>
				)}
			</div>
		</div>
	);
};

export default Authors;
