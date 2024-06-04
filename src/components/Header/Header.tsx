import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import style from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import {
	removeUser,
	removeUserFromServer,
	selectUser,
} from '../../store/user/userSlice';

const Header: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const userInfo = useAppSelector(selectUser);
	const userToken = localStorage.getItem('userToken');
	console.log(userInfo);

	const loginOrRegister =
		location.pathname === '/login' || location.pathname === '/register';

	const handleLogOut = () => {
		if (userInfo.isAuth || userToken) {
			dispatch(removeUser());
			if (userToken) dispatch(removeUserFromServer(userToken));
			localStorage.removeItem('userToken');

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
						buttonText={`${userInfo.isAuth || userToken ? 'log out' : 'log in'}`}
						onClick={handleLogOut}
					/>
				</div>
			)}
		</header>
	);
};

export default Header;
