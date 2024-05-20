import { useState } from 'react';

import style from './Login.module.scss';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

interface FormElements extends HTMLFormControlsCollection {
	email: HTMLInputElement;
	password: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

export const Login: React.FC = () => {
	const [errors, setErrors] = useState({
		emailIsEmpty: false,
		passwordIsEmpty: false,
	});

	const handleSubmit = (e: React.FormEvent<UsernameFormElement>) => {
		e.preventDefault();

		const target = e.currentTarget.elements;

		const email = target.email.value.trim();
		const password = target.password.value.trim();

		setErrors({
			emailIsEmpty: !email,
			passwordIsEmpty: !password,
		});
	};

	const resetError = () => {
		setErrors({
			emailIsEmpty: false,
			passwordIsEmpty: false,
		});
	};

	return (
		<form onSubmit={handleSubmit} onBlur={resetError} className={style.form}>
			<h2 className={style.formTitle}>Login</h2>

			<div className={style.formContent}>
				<div className={style.formContent__wrapper}>
					<Input
						inputId={'email'}
						labelText={'email'}
						inputType={'email'}
						className={`${errors.emailIsEmpty && style.error}`}
					/>
					<span
						className={`${style.errorMessage} ${errors.emailIsEmpty && style.active}`}
					>
						Email is required
					</span>

					<Input
						inputId={'password'}
						labelText={'password'}
						inputType={'password'}
						className={`${errors.passwordIsEmpty && style.error}`}
					/>

					<span
						className={`${style.errorMessage} ${errors.passwordIsEmpty && style.active}`}
					>
						Password is required
					</span>

					<Button
						className={style.button}
						buttonText={'Login'}
						buttonType='submit'
					/>

					<span className={style.text}>
						If you don't have an account you may{' '}
						<a className={style.link} href='#'>
							register
						</a>
					</span>
				</div>
			</div>
		</form>
	);
};

export default Login;
