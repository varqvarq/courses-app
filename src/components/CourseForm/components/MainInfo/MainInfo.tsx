import style from './MainInfo.module.scss';

import Input from '../../../../common/Input/Input';
import { CourseType } from '../../../../store/courses/coursesSlice';

interface MainInfoProps {
	onError: {
		titleError: string;
		descriptionError: string;
	};
	className?: string;
	inputClassName?: string;
	data: CourseType;
	setData: React.Dispatch<React.SetStateAction<CourseType>>;
}

const MainInfo: React.FC<MainInfoProps> = ({
	onError,
	className,
	inputClassName,
	data,
	setData,
}) => {
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	return (
		<>
			<h3 className={style.heading}>Main info</h3>

			<Input
				inputId={'title'}
				inputType={'text'}
				labelText={'title'}
				labelType={'small'}
				value={data?.title}
				onChange={handleInputChange}
				className={`${style.title} ${className}`}
				inputClassName={`${style.titleInput} ${inputClassName}`}
				errorMessage={onError.titleError}
			/>

			<Input
				inputId={'description'}
				labelText={'description'}
				className={`${style.description} ${className}`}
				inputClassName={`${style.descriptionArea} ${inputClassName}`}
				inputType={'textarea'}
				labelType={'small'}
				value={data?.description}
				onAreaChange={handleInputChange}
				errorMessage={onError.descriptionError}
			/>
		</>
	);
};

export default MainInfo;
