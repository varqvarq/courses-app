import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import style from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { removeUser, selectUser } from '../../store/user/userSlice';

const Header: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const userInfo = useAppSelector(selectUser);

	const loginOrRegister =
		location.pathname === '/login' || location.pathname === '/register';

	const handleLogOut = () => {
		if (userInfo.isAuth) {
			localStorage.removeItem('userToken');
			dispatch(removeUser());
			navigate('/login');
		}
	};

	return (
		<header className={style.header}>
			<Link to='/'>
				<Logo className={style.logo} />
			</Link>
			{!loginOrRegister && (
				<div className={style.loginWrapper}>
					<p className={style.userName}>{userInfo.name}</p>
					<Button
						className={`button ${style.button}`}
						buttonText={`${userInfo.isAuth ? 'log out' : 'log in'}`}
						onClick={handleLogOut}
					/>
				</div>
			)}
		</header>
	);
};

export default Header;
