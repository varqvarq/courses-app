import { ICourse } from '../components/Courses/Courses';

const findCourse = (
	courseId: string | undefined,
	courses: ICourse[]
): ICourse | undefined => {
	return courses.find((course) => course.id === courseId);
};

export default findCourse;
