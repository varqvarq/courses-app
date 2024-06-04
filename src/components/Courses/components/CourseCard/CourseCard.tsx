import { Link, useNavigate } from 'react-router-dom';

import formatDate from '../../../../helpers/formatCreationDate';
import getDuration from '../../../../helpers/getCourseDuration';

import style from './CourseCard.module.scss';
import Button from '../../../../common/Button/Button';

import courseSlice, {
	CourseType,
	removeCourse,
	removeCourseFromServer,
} from '../../../../store/courses/coursesSlice';
import { AuthorType } from '../../../../store/authors/authorSlice';

import findAuthors from '../../../../helpers/getCourseAuthors';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../hooks/useTypedSelector';
import { selectUser } from '../../../../store/user/userSlice';

interface CourseCardProps {
	course: CourseType;
	authors: AuthorType[];
}

const CourseCard: React.FC<CourseCardProps> = ({ course, authors }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userInfo = useAppSelector(selectUser);
	const handleCourseDeletion = (id: string) => {
		dispatch(removeCourse(id));
		dispatch(removeCourseFromServer(id));
	};

	return (
		<div className={style.container}>
			<div className={style.wrapper}>
				<div className={style.leftSection}>
					<h2 className={style.title}>{course.title}</h2>
					<article className={style.description}>{course.description}</article>
				</div>

				<div className={style.rightSection}>
					<div className={style.metadata}>
						<p className={style.authors}>
							<b>Authors: </b>
							{findAuthors(course.authors, authors)}
						</p>

						<p className={style.duration}>
							<b>Duration: </b>
							{getDuration(course.duration)}
						</p>

						<p className={style.creationDate}>
							<b>Created: </b>
							{formatDate(course.creationDate)}
						</p>
					</div>

					<div className={style.buttonsWrapper}>
						<Button
							className={`button ${style.button}`}
							buttonText={'show course'}
							onClick={() => navigate(`/courses/${course.id}`)}
						/>
						{/* </Link> */}
						{userInfo.role === 'admin' && (
							<>
								<Button
									onClick={() => handleCourseDeletion(course.id)}
									className={style.removeCourseButton}
								>
									<svg
										width='23'
										height='25'
										viewBox='0 0 23 25'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M18.5312 25C19.1823 25 19.7357 24.7721 20.1914 24.3164C20.6471 23.8607 20.875 23.3073 20.875 22.6562V4.6875H22.1445C22.2096 4.6875 22.2747 4.65495 22.3398 4.58984C22.4049 4.52474 22.4375 4.45964 22.4375 4.39453V4.29688C22.4375 3.97135 22.3236 3.69466 22.0957 3.4668C21.8678 3.23893 21.5911 3.125 21.2656 3.125H16.9688L15.3086 0.927734C14.8529 0.309245 14.2344 0 13.4531 0H9.54688C8.76562 0 8.14714 0.309245 7.69141 0.927734L6.03125 3.125H1.73438C1.40885 3.125 1.13216 3.23893 0.904297 3.4668C0.676432 3.69466 0.5625 3.97135 0.5625 4.29688V4.39453C0.5625 4.45964 0.595052 4.52474 0.660156 4.58984C0.72526 4.65495 0.790365 4.6875 0.855469 4.6875H2.125V22.6562C2.125 23.3073 2.35286 23.8607 2.80859 24.3164C3.26432 24.7721 3.81771 25 4.46875 25H18.5312ZM15.0156 3.12501H7.98438L8.91211 1.85548C9.07487 1.66016 9.28646 1.56251 9.54688 1.56251H13.4531C13.7135 1.56251 13.9251 1.66016 14.0879 1.85548L15.0156 3.12501ZM18.5312 23.4375H4.46875C4.24089 23.4375 4.05371 23.3643 3.90723 23.2178C3.76074 23.0713 3.6875 22.8841 3.6875 22.6562V4.68749H19.3125V22.6562C19.3125 22.8841 19.2393 23.0713 19.0928 23.2178C18.9463 23.3643 18.7591 23.4375 18.5312 23.4375ZM11.6953 21.0938C11.8581 21.0938 11.9964 21.0368 12.1104 20.9229C12.2243 20.8089 12.2812 20.6706 12.2812 20.5078V7.61719C12.2812 7.45443 12.2243 7.31609 12.1104 7.20215C11.9964 7.08822 11.8581 7.03126 11.6953 7.03126H11.3047C11.1419 7.03126 11.0036 7.08822 10.8896 7.20215C10.7757 7.31609 10.7188 7.45443 10.7188 7.61719V20.5078C10.7188 20.6706 10.7757 20.8089 10.8896 20.9229C11.0036 21.0368 11.1419 21.0938 11.3047 21.0938H11.6953ZM7.78906 21.0938C7.95182 21.0938 8.09017 21.0368 8.2041 20.9229C8.31803 20.8089 8.375 20.6706 8.375 20.5078V7.61719C8.375 7.45443 8.31803 7.31609 8.2041 7.20215C8.09017 7.08822 7.95182 7.03126 7.78906 7.03126H7.39844C7.23568 7.03126 7.09733 7.08822 6.9834 7.20215C6.86947 7.31609 6.8125 7.45443 6.8125 7.61719V20.5078C6.8125 20.6706 6.86947 20.8089 6.9834 20.9229C7.09733 21.0368 7.23568 21.0938 7.39844 21.0938H7.78906ZM15.6016 21.0938C15.7643 21.0938 15.9027 21.0368 16.0166 20.9229C16.1305 20.8089 16.1875 20.6706 16.1875 20.5078V7.61719C16.1875 7.45443 16.1305 7.31609 16.0166 7.20215C15.9027 7.08822 15.7643 7.03126 15.6016 7.03126H15.2109C15.0482 7.03126 14.9098 7.08822 14.7959 7.20215C14.682 7.31609 14.625 7.45443 14.625 7.61719V20.5078C14.625 20.6706 14.682 20.8089 14.7959 20.9229C14.9098 21.0368 15.0482 21.0938 15.2109 21.0938H15.6016Z'
											fill='white'
										/>
									</svg>
								</Button>
								<Button
									className={style.editCourseButton}
									onClick={() => {
										navigate(`/courses/update/${course.id}`);
									}}
								>
									<svg
										width='25'
										height='25'
										viewBox='0 0 25 25'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M1.30148 24.9926L6.87684 24.3731L24.0847 7.16528C25.305 5.94486 25.305 3.96618 24.0846 2.74587L22.254 0.915293C21.0337 -0.305074 19.0551 -0.305121 17.8346 0.915293L0.626805 18.1231L0.00734773 23.6984C-0.0755741 24.4448 0.555185 25.0755 1.30148 24.9926ZM20.5412 8.49893L16.501 4.45869L18.9395 2.02016C19.5501 1.40957 20.5385 1.40947 21.1492 2.02016L22.9797 3.85073C23.5904 4.46137 23.5904 5.4497 22.9797 6.06043L20.5412 8.49893ZM8.49605 20.5441V18.8476H6.1523V16.5039H4.45577L15.3961 5.56352L19.4364 9.60376L8.49605 20.5441ZM3.27889 23.2008L1.79912 21.721L2.11922 18.8404L3.08858 17.871H4.78512V20.2148H7.12886V21.9113L6.1595 22.8807L3.27889 23.2008Z'
											fill='white'
										/>
									</svg>
								</Button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
