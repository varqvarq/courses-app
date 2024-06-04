import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { selectUser } from '../../store/user/userSlice';

const PrivateRoute: React.FC<{ role?: string }> = ({ role }) => {
	const isAuth = localStorage.getItem('userToken');
	const userInfo = useAppSelector(selectUser);

	if (!isAuth) {
		return <Navigate to='/login' />;
	}

	if (role && userInfo.role !== role) {
		return <Navigate to='/courses' />;
	}

	return <Outlet />;

	// return !roles?.length || roles.includes(userInfo?.role) ? (
	// 	<Outlet />
	// ) : (
	// 	<Navigate to='/Login' />
	// );
};

export default PrivateRoute;
