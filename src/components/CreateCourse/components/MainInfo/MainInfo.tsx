import style from './MainInfo.module.scss';

import Input from '../../../../common/Input/Input';

interface MainInfoProps {
	onError: {
		titleError: string;
		descriptionError: string;
	};
	className?: string;
	inputClassName?: string;
}

const MainInfo: React.FC<MainInfoProps> = ({
	onError,
	className,
	inputClassName,
}) => {
	return (
		<>
			<h3 className={style.heading}>Main info</h3>

			<Input
				inputId={'title'}
				inputType={'text'}
				labelText={'title'}
				labelType={'small'}
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
				errorMessage={onError.descriptionError}
			/>
		</>
	);
};

export default MainInfo;
