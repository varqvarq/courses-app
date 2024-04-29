import './Button.scss';

interface ButtonInterface {
	className: string;
	buttonText: string;
	onClick: () => void;
}

export default function Button({
	buttonText,
	onClick,
	className,
}: ButtonInterface) {
	return (
		<button className={className} onClick={onClick}>
			{buttonText}
		</button>
	);
}
