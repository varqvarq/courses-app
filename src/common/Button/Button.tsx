import style from './Button.module.scss';

interface ButtonInterface {
	className?: string;
	buttonText?: string;
	buttonType?: 'button' | 'submit' | 'reset';
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonInterface> = ({
	className,
	buttonText,
	buttonType = 'button',
	onClick,
}) => {
	return (
		<button
			className={`${style.button} ${className}`}
			type={buttonType}
			onClick={onClick}
		>
			{buttonText}
		</button>
	);
};

export default Button;
