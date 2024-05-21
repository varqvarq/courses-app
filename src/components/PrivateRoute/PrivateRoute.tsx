import { ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
	children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
	const isAuth = localStorage.getItem('userToken');
	return isAuth ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
