import { useState } from 'react';
import uuid from 'react-uuid';

import style from './CreateCourse.module.scss';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';

import getDuration from '../../helpers/getCourseDuration';
import createDate from '../../helpers/createNewDate';

import { ICourse, IAuthor } from '../Courses/Courses';

import { mockedAuthorsList, mockedCoursesList } from '../../constant';

export const copyMockedCoursesList: ICourse[] = mockedCoursesList;
export const copyMockedAuthorsList: IAuthor[] = mockedAuthorsList;

interface FormElements extends HTMLFormControlsCollection {
	title: HTMLInputElement;
	description: HTMLTextAreaElement;
	duration: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

const CreateCourse: React.FC = () => {
	const initialErrors = {
		titleIsEmpty: false,
		descriptionIsEmpty: false,
		durationIsEmpty: false,
		authors: false,
	};

	const [errors, setErrors] = useState(initialErrors);
	const [name, setAuthorName] = useState('');
	const [authors, setAuthors] = useState(copyMockedAuthorsList);
	const [courseAuthors, setCourseAuthors] = useState<IAuthor[]>([]);
	const [duration, setDuraion] = useState('00:00 hours');

	const handleSubmit = (e: React.FormEvent<UsernameFormElement>) => {
		e.preventDefault();

		const target = e.currentTarget.elements;

		const title = target.title.value.trim();
		const description = target.description.value.trim();
		const duration = +target.duration.value;

		const newErrors = {
			titleIsEmpty: title.length < 2,
			descriptionIsEmpty: description.length < 2,
			durationIsEmpty: duration < 1,
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

		if (!copyMockedCoursesList.includes(courseData)) {
			copyMockedCoursesList.push(courseData);
		}

		courseAuthors.forEach((author) => {
			if (!copyMockedAuthorsList.includes(author)) {
				copyMockedAuthorsList.push(author);
			}
		});

		target.title.value = '';
		target.description.value = '';
		target.duration.value = '';
		setDuraion('00:00 hours');
		setCourseAuthors([]);
		setAuthorName('');
	};

	const removeFromAuthorsList = (id: string) => {
		const newAuthorsList = authors.filter((author) => author.id !== id);
		setAuthors(newAuthorsList);
	};

	const addToCourseAuthorsList = (id: string) => {
		const newCourseAuthor = authors.find((author) => {
			if (courseAuthors.includes(author)) {
				return;
			} else {
				return author.id == id;
			}
		});

		if (newCourseAuthor) {
			setCourseAuthors([...courseAuthors, newCourseAuthor]);
		}
	};

	const removeFromCourseAuthorsList = (id: string) => {
		const newCourseAuthorsList = courseAuthors.filter((courseAuthor) => {
			return courseAuthor.id !== id;
		});

		setCourseAuthors(newCourseAuthorsList);
	};

	const resetError = () => {
		setErrors({
			titleIsEmpty: false,
			descriptionIsEmpty: false,
			durationIsEmpty: false,
			authors: false,
		});
	};

	const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '');
		const value = +e.target.value;

		const formattedDuration = getDuration(value);
		setDuraion(formattedDuration);
	};

	const addAuthorName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.value;
		setAuthorName(name);
	};

	const addAuthor = () => {
		const newAuthor = { id: uuid(), name: name.trim() };

		if (name.trim()) {
			if (!authors.includes(newAuthor)) {
				setAuthors([...authors, { id: uuid(), name: name.trim() }]);
				setAuthorName('');
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addAuthor();
		}
	};

	return (
		<form onSubmit={handleSubmit} onBlur={resetError} className={style.form}>
			<h2 className={style.form__title}>Course edit/Create page</h2>

			<div className={style.form__content}>
				<div className={style.wrapper}>
					<h3 className={style.subheading}>Main info</h3>

					<Input
						inputId={'title'}
						inputType={'text'}
						labelText={'title'}
						labelType={'small'}
						className={`${style.titleInput} ${errors.titleIsEmpty && style.error}`}
					/>

					<span
						className={`${style.errorMessage} ${errors.titleIsEmpty && style.active}`}
					>
						Title is required
					</span>

					<Input
						inputId={'description'}
						labelText={'description'}
						className={`${style.descriptionArea} ${errors.descriptionIsEmpty && style.error}`}
						inputType={'textarea'}
						labelType={'small'}
					/>

					<span
						className={`${style.errorMessage} ${errors.descriptionIsEmpty && style.active}`}
					>
						Description is required
					</span>

					<h3 className={style.subheading}>Duration</h3>

					<div className={style.durationWrapper}>
						<Input
							inputId={'duration'}
							labelText={'duration'}
							inputType={'text'}
							className={`${style.durationInput} ${errors.durationIsEmpty && style.error}`}
							labelType={'small'}
							placeholderText='input minutes'
							onChange={handleDuration}
						/>

						<span className={style.convertedDuration}>
							<b>{duration.split(' ')[0]} </b>
							{duration.split(' ')[1]}
						</span>
					</div>

					<span
						className={`${style.errorMessage} ${errors.durationIsEmpty && style.active}`}
					>
						Duration is required
					</span>

					<div className={style.authorsSection}>
						<div className={style.authorsList}>
							<h3 className={style.subheading}>Authors</h3>

							<Input
								inputId={'authorName'}
								labelText={'author name'}
								inputType={'text'}
								className={style.authorsInput}
								labelType={'small'}
								value={name}
								onChange={addAuthorName}
								onKeyDown={handleKeyDown}
							></Input>

							<Button
								className={style.authorsButton}
								buttonText={'create author'}
								onClick={addAuthor}
							/>

							<h4
								className={style.authorsSubheading}
								onClick={() => setAuthors(copyMockedAuthorsList)}
							>
								Authors List
							</h4>

							{authors &&
								authors.map((author) => {
									return (
										<AuthorItem
											key={author.id}
											authorName={author.name}
											addButton
											deleteButton
											onDelete={() => {
												removeFromAuthorsList(author.id);
											}}
											onAdd={() => {
												addToCourseAuthorsList(author.id);
											}}
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
											deleteButton
											onDelete={() =>
												removeFromCourseAuthorsList(courseAuthor.id)
											}
										/>
									);
								})
							) : (
								<p
									className={`${style.placeholder} ${errors.authors && style.red}`}
								>
									Author list is empty
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className={style.buttonsWrapper}>
				<Button buttonText={'cancel'} className={style.formButton} />
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
