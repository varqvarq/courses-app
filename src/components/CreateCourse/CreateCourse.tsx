import { useCallback, useState } from 'react';
import uuid from 'react-uuid';
import { Link, useNavigate } from 'react-router-dom';

import style from './CreateCourse.module.scss';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from './components/Authors/AuthorItem/AuthorItem';
import Duration from './components/Duration/Duration';
import MainInfo from './components/MainInfo/MainInfo';

import createDate from '../../helpers/createNewDate';

import { ICourse, IAuthor } from '../Courses/Courses';

import Authors from './components/Authors/Authors';

import {
	mockedCoursesList as courses,
	mockedAuthorsList as authors,
} from '../../constant';

export const copyCoursesList: ICourse[] = courses;
export const copytAuthorsList: IAuthor[] = authors;

interface FormElements extends HTMLFormControlsCollection {
	title: HTMLInputElement;
	description: HTMLTextAreaElement;
	duration: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

const initialErrors = {
	titleError: '',
	descriptionError: '',
	durationError: '',
	authors: false,
};

const CreateCourse: React.FC = () => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState(initialErrors);
	const [courseAuthors, setCourseAuthors] = useState<IAuthor[]>([]);

	const handleSubmit = (e: React.FormEvent<UsernameFormElement>) => {
		e.preventDefault();

		const target = e.currentTarget.elements;
		const title = target.title.value.trim();
		const description = target.description.value.trim();
		const duration = +target.duration.value;

		const newErrors = {
			titleError: !title.length
				? 'Title required'
				: title.length < 2
					? 'Title length should be at least 2 characters'
					: '',
			descriptionError: !description.length
				? 'Description required'
				: description.length < 2
					? 'Description length should be at least 2 characters'
					: '',
			durationError: duration ? '' : 'Duration required',
			authors: !courseAuthors.length,
		};

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}

		const courseData: ICourse = {
			id: uuid(),
			title,
			description,
			creationDate: createDate(),
			duration,
			authors: courseAuthors.map((courseAuthors) => courseAuthors.id),
		};

		if (!copyCoursesList.includes(courseData)) {
			copyCoursesList.push(courseData);
		}

		courseAuthors.forEach((author) => {
			if (!copytAuthorsList.includes(author)) {
				copytAuthorsList.push(author);
			}
		});

		navigate('/');
	};

	const resetError = () => {
		setErrors(initialErrors);
	};

	return (
		<form onSubmit={handleSubmit} onBlur={resetError} className={style.form}>
			<h2 className={style.formTitle}>Course edit/Create page</h2>

			<div className={style.formContent}>
				<MainInfo onError={errors} />

				<Duration className={style.duration} onError={errors.durationError} />
				<Authors
					courseAuthors={courseAuthors}
					setCourseAuthors={setCourseAuthors}
					onError={errors.authors}
				/>
			</div>

			<div className={style.buttonsWrapper}>
				<Link to='/'>
					<Button buttonText={'cancel'} className={style.formButton} />
				</Link>
				<Button
					buttonText={'create course'}
					className={style.formButton}
					buttonType='submit'
				/>
			</div>
		</form>
	);
};

export default CreateCourse;
