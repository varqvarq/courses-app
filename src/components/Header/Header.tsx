import { Link, useNavigate } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import style from './Header.module.scss';

const Header: React.FC = () => {
	const navigate = useNavigate();
	const isAuth = localStorage.getItem('userToken');
	const handleLogOut = () => {
		if (isAuth) {
			localStorage.removeItem('userToken');
		}
		navigate('/login');
	};

	return (
		<header className={style.header}>
			<Link to='/'>
				<Logo />
			</Link>
			<Button
				className={`button ${style.button}`}
				buttonText={`${isAuth ? 'log out' : 'log in'}`}
				onClick={handleLogOut}
			/>
		</header>
	);
};

export default Header;
