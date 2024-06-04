import React from 'react';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { selectUser } from '../../store/user/userSlice';
import { Navigate } from 'react-router-dom';

interface Props {
	component: React.ReactNode;
}

const AdminPrivateRoute: React.FC<Props> = ({ component }) => {
	const userData = useAppSelector(selectUser);

	if (!userData || userData.role !== 'admin') {
		return <Navigate to='/courses' />;
	}

	return <>{component}</>;
};

export default AdminPrivateRoute;
