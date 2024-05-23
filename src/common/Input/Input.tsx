import style from './Input.module.scss';

interface Props {
	inputId: string;
	inputType: string;
	labelText?: string;
	labelType?: string;
	className?: string;
	inputClassName?: string;
	value?: string;
	placeholderText?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	errorMessage?: string;
	rightElement?: React.ReactNode;
	ref?: React.Ref<HTMLInputElement>;
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
	onKeyDown,
	errorMessage,
	rightElement,
	ref,
}) => {
	return (
		<div className={`${style.container} ${className}`}>
			<label
				htmlFor={inputId}
				className={`${style.label} ${labelType ? style.smallLabel : ''}`}
			>
				{labelText}
			</label>

			<div className={style.inputWrapper}>
				{inputType === 'textarea' ? (
					<textarea
						id={inputId}
						className={`${errorMessage && style.borderError} ${style.input} ${style.textArea} ${inputClassName}`}
						placeholder={placeholderText}
					/>
				) : (
					<input
						type={inputType}
						id={inputId}
						className={`${errorMessage && style.borderError} ${style.input} ${inputClassName}`}
						placeholder={placeholderText}
						value={value}
						onChange={onChange}
						onKeyDown={onKeyDown}
						ref={ref}
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
