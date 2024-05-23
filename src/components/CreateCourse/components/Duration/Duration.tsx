import { useState } from 'react';

import style from './Duration.module.scss';

import Input from '../../../../common/Input/Input';
import { getDuration } from '../../../../helpers';

interface DurationProps {
	className: string;
	onError: string;
}

const Duration: React.FC<DurationProps> = ({ onError, className }) => {
	const [duration, setDuration] = useState('00:00 hours');

	const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '');
		const value = +e.target.value;

		const formattedDuration = getDuration(value);
		setDuration(formattedDuration);
	};

	return (
		<>
			<h3 className={style.heading}>Duration</h3>
			<Input
				inputId='duration'
				inputType='text'
				labelText='duration'
				labelType='small'
				className={className}
				inputClassName={style.input}
				placeholderText='input number'
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
