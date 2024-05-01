import './Button.scss';

interface ButtonInterface {
	className: string;
	buttonText: string;
	onClick: () => void;
}

const Button: React.FC<ButtonInterface> = ({
	buttonText,
	onClick,
	className,
}) => {
	return (
		<button className={className} onClick={onClick}>
			{buttonText}
		</button>
	);
};

export default Button;
