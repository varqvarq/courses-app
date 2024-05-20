import style from './Input.module.scss';

interface Props {
	inputId: string;
	inputType: string;
	labelText?: string;
	labelType?: string;
	className: string;
	value?: string;
	placeholderText?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
	inputId,
	inputType,
	labelText,
	labelType,
	className,
	value,
	placeholderText = 'Input text',
	onChange,
	onKeyDown,
}) => {
	return (
		<>
			<label
				htmlFor={inputId}
				className={`${style.label} ${labelType && style.smallLabel}`}
			>
				{labelText}
			</label>

			{inputType === 'textarea' ? (
				<textarea
					id={inputId}
					className={`${style.input} ${style.textArea} ${className}`}
					placeholder={placeholderText}
				></textarea>
			) : (
				<input
					type={inputType}
					id={inputId}
					className={`${style.input} ${className}`}
					placeholder={placeholderText}
					value={value}
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>
			)}
		</>
	);
};

export default Input;
