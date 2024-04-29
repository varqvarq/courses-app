import React from 'react';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import style from './Header.module.scss';

export default function Header() {
	return (
		<div className={style.header}>
			<Logo />
			<Button
				className='button'
				buttonText='Logout'
				onClick={() => console.log('')}
			/>
		</div>
	);
}
