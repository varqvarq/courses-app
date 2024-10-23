import { useEffect, useState } from 'react';

import style from './Duration.module.scss';

import Input from '../../../../common/Input/Input';
import { getDuration } from '../../../../helpers';
import { CourseType } from '../../../../store/courses/coursesSlice';

interface DurationProps {
	className: string;
	onError: string;
	data: CourseType;
	setData: React.Dispatch<React.SetStateAction<CourseType>>;
}

const Duration: React.FC<DurationProps> = ({
	onError,
	className,
	data,
	setData,
}) => {
	const [duration, setDuration] = useState('00:00 hours');

	useEffect(() => {
		const formattedDuration = getDuration(data.duration);
		setDuration(formattedDuration);
	}, [data.duration]);

	const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '');
		const value = +e.target.value;

		const formattedDuration = getDuration(value);
		setDuration(formattedDuration);
		setData({ ...data, duration: value });
	};

	return (
		<>
			<h3 className={style.heading}>Duration</h3>
			<Input
				inputId='duration'
				inputType='text'
				labelText='duration'
				labelType='small'
				className={`${style.duration} ${className}`}
				value={data.duration !== 0 ? data.duration.toString() : ''}
				inputClassName={style.durationInput}
				placeholderText='Input number'
				onChange={handleDuration}
				errorMessage={onError}
				rightElement={
					<span className={style.convertedDuration}>
						<b>{duration.split(' ')[0]} </b>
						{duration.split(' ')[1]}
					</span>
				}
			/>
		</>
	);
};

export default Duration;
