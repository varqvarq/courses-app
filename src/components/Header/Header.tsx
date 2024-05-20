import { useState } from 'react';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import style from './Header.module.scss';

const Header: React.FC = () => {
	return (
		<header className={style.header}>
			<Logo />
			<Button
				className={`button ${style.button}`}
				buttonText={'Login'}
				onClick={() => {
					console.log('');
				}}
			/>
		</header>
	);
};

export default Header;
