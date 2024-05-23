import { Link, useNavigate } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import style from './Header.module.scss';

const Header: React.FC = () => {
	const navigate = useNavigate();

	const userInfo = localStorage.getItem('userInfo');
	const isAuth = userInfo ? JSON.parse(userInfo) : '';

	const handleLogOut = () => {
		if (isAuth) {
			localStorage.removeItem('userInfo');
		}
		navigate('/login');
	};

	return (
		<header className={style.header}>
			<Link to='/'>
				<Logo />
			</Link>
			<div className={style.loginWrapper}>
				<p className={style.userName}>{isAuth.userName}</p>
				<Button
					className={`button ${style.button}`}
					buttonText={`${isAuth ? 'log out' : 'log in'}`}
					onClick={handleLogOut}
				/>
			</div>
		</header>
	);
};

export default Header;
