import { CourseTypeNew, CourseType } from '../store/courses/coursesSlice';

const findCourse = (
	courseId: string | undefined,
	courses: CourseType[]
): CourseType | undefined => {
	return courses.find((course) => course.id === courseId);
};

export default findCourse;
