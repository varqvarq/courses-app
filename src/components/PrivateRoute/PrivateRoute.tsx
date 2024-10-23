import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC<{ role?: string }> = () => {
	const isAuth = localStorage.getItem('userToken');

	if (!isAuth) {
		return <Navigate to='/login' />;
	}

	// if (role && userInfo.role !== role) {
	// 	return <Navigate to='/courses' />;
	// }

	return <Outlet />;

	// return !roles?.length || roles.includes(userInfo?.role) ? (
	// 	<Outlet />
	// ) : (
	// 	<Navigate to='/Login' />
	// );
};

export default PrivateRoute;
