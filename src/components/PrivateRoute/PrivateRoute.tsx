import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
	const isAuth = localStorage.getItem('userToken');
	return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
