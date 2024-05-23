import { ReactElement, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
	children: ReactElement;
}

const PrivateRoute: React.FC = () => {
	const isAuth = localStorage.getItem('userInfo');
	return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
