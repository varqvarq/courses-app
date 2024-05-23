import style from './CourseAuthorsList.module.scss';

import { IAuthor } from '../../../../Courses/Courses';

import AuthorItem from '../AuthorItem/AuthorItem';

interface Props {
	courseAuthors: IAuthor[];
	onRemove: (id: string) => void;
	onError: boolean;
}

const CourseAuthorsList: React.FC<Props> = ({
	courseAuthors,
	onRemove,
	onError,
}) => {
	return (
		<div className={style.courseAuthorsList}>
			<h3 className={style.subheading}>Course Authors</h3>

			{courseAuthors.length ? (
				courseAuthors.map((courseAuthor) => {
					return (
						<AuthorItem
							key={courseAuthor.id}
							authorName={courseAuthor.name}
							removeButton
							onRemove={() => onRemove(courseAuthor.id)}
						/>
					);
				})
			) : (
				<p className={`${style.placeholder} ${onError && style.error}`}>
					Author list is empty
				</p>
			)}
		</div>
	);
};

export default CourseAuthorsList;
