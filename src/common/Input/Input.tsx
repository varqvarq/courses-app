import style from './Input.module.scss';

interface Props {
	inputId: string;
	inputType: string;
	labelText?: string;
	labelType?: string;
	name?: string;
	className?: string;
	inputClassName?: string;
	value?: string;
	placeholderText?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onAreaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	errorMessage?: string;
	rightElement?: React.ReactNode;
	wrap?: boolean;
}

const Input: React.FC<Props> = ({
	inputId,
	inputType,
	labelText,
	labelType,
	className,
	inputClassName,
	value,
	placeholderText = 'Input text',
	onChange,
	onAreaChange,
	onKeyDown,
	errorMessage,
	rightElement,
	wrap,
}) => {
	return (
		<div className={`${style.container} ${className}`}>
			{labelText && (
				<label
					htmlFor={inputId}
					className={`${style.label} ${labelType ? style.smallLabel : ''}`}
				>
					{labelText}
				</label>
			)}

			<div className={`${style.inputWrapper} ${wrap && style.wrap}`}>
				{inputType === 'textarea' ? (
					<textarea
						id={inputId}
						className={`${errorMessage && style.borderError} ${style.input} ${style.textArea} ${inputClassName}`}
						placeholder={placeholderText}
						onChange={onAreaChange}
						name={inputId}
						value={value}
					/>
				) : (
					<input
						type={inputType}
						id={inputId}
						className={`${errorMessage && style.borderError} ${style.input} ${inputClassName}`}
						placeholder={placeholderText}
						value={value}
						name={inputId}
						onChange={onChange}
						onKeyDown={onKeyDown}
					/>
				)}
				{rightElement}
			</div>

			{errorMessage && (
				<span className={style.errorMessage}>{errorMessage}</span>
			)}
		</div>
	);
};

export default Input;
