import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import style from './Header.module.scss';

const Header: React.FC = () => {
	return (
		<div className={style.container}>
			<Logo />
			<Button
				className={`button ${style.button}`}
				buttonText='Logout'
				onClick={() => console.log('')}
			/>
		</div>
	);
};

export default Header;
