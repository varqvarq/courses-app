import style from './Button.module.scss';

interface ButtonInterface {
	className?: string;
	buttonText?: string;
	buttonType?: 'button' | 'submit' | 'reset';
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	children?: React.ReactNode;
}

const Button: React.FC<ButtonInterface> = ({
	className,
	buttonText,
	buttonType = 'button',
	onClick,
	disabled = false,
	children,
}) => {
	return (
		<button
			className={`${style.button} ${className}`}
			type={buttonType}
			onClick={onClick}
			disabled={disabled}
		>
			{disabled ? '...Loading' : buttonText}
			{children}
		</button>
	);
};

export default Button;
