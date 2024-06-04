import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import style from './CourseForm.module.scss';

import Button from '../../common/Button/Button';
import MainInfo from './components/MainInfo/MainInfo';
import Duration from './components/Duration/Duration';
import Authors from './components/Authors/Authors';

import {
	CourseType,
	CourseTypeNew,
	addCourseToServer,
	editCourse,
	editCourseOnServer,
	selectCourses,
} from '../../store/courses/coursesSlice';
import { AuthorType, selectAuthors } from '../../store/authors/authorSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { findAuthors } from '../../helpers';

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

const initialCourseData = {
	id: '',
	title: '',
	description: '',
	creationDate: '',
	duration: 0,
	authors: [],
};

const CourseForm: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const courses = useAppSelector(selectCourses);
	const authors = useAppSelector(selectAuthors);

	const [errors, setErrors] = useState(initialErrors);
	const [courseAuthors, setCourseAuthors] = useState<AuthorType[]>([]);

	const [isEditMode, setIsEditMode] = useState(false);
	const [courseData, setCourseData] = useState<CourseType>(initialCourseData);

	const params = useParams();
	const courseForEdit = courses.find((course) => course.id === params.courseId);

	useEffect(() => {
		console.log(courseForEdit);
		if (courseForEdit) {
			setIsEditMode(true);
			setCourseData({
				...initialCourseData,
				id: courseForEdit.id,
				title: courseForEdit.title,
				description: courseForEdit.description,
				creationDate: courseForEdit.creationDate,
				duration: courseForEdit.duration,
				authors: courseForEdit.authors,
			});
			const cAuthors = courseForEdit.authors
				.map((authorId) => authors.find((author) => author.id === authorId))
				.filter((author) => author !== undefined) as AuthorType[];

			if (cAuthors) {
				setCourseAuthors(cAuthors);
			}
		}
	}, [courseForEdit]);

	console.log(courseData);

	const handleSubmit = (e: React.FormEvent<UsernameFormElement>) => {
		e.preventDefault();

		const newErrors = {
			titleError: !courseData.title.length
				? 'Title required'
				: courseData.title.length < 2
					? 'Title length should be at least 2 characters'
					: '',
			descriptionError: !courseData.description.length
				? 'Description required'
				: courseData.description.length < 2
					? 'Description length should be at least 2 characters'
					: '',
			durationError: courseData.duration ? '' : 'Duration required',
			authors: !courseAuthors.length,
		};

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}

		const newCourseInfo: CourseTypeNew = {
			title: courseData.title,
			description: courseData.description,
			duration: courseData.duration,
			authors: courseAuthors.map((courseAuthors) => courseAuthors.id),
		};

		if (isEditMode) {
			const editedCourse: CourseType = {
				id: courseData.id,
				title: courseData.title,
				description: courseData.description,
				creationDate: courseData.creationDate,
				duration: courseData.duration,
				authors: courseAuthors.map((courseAuthors) => courseAuthors.id),
			};
			dispatch(editCourse(editedCourse));
			dispatch(editCourseOnServer(editedCourse));
		}
		dispatch(addCourseToServer(newCourseInfo));

		navigate('/');
	};

	const resetError = () => {
		setErrors(initialErrors);
	};

	return (
		<form onSubmit={handleSubmit} onBlur={resetError} className={style.form}>
			<h2 className={style.formTitle}>
				{isEditMode ? 'Course Edit' : 'Create Page'}
			</h2>

			<div className={style.formContent}>
				<MainInfo onError={errors} data={courseData} setData={setCourseData} />

				<Duration
					className={style.duration}
					onError={errors.durationError}
					data={courseData}
					setData={setCourseData}
				/>

				<Authors
					courseAuthors={courseAuthors}
					setCourseAuthors={setCourseAuthors}
					onError={errors.authors}
					data={courseData}
					setData={setCourseData}
				/>
			</div>

			<div className={style.buttonsWrapper}>
				<Button
					buttonText={'cancel'}
					className={style.formButton}
					onClick={() => navigate(-1)}
				/>

				<Button
					buttonText={`${isEditMode ? 'edit course' : 'create course'}`}
					className={style.formButton}
					buttonType='submit'
				/>
			</div>
		</form>
	);
};

export default CourseForm;
