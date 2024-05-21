import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();

	const [errors, setErrors] = useState({
		emailIsEmpty: false,
		passwordIsEmpty: false,
	});

	const handleSubmit = async (e: React.FormEvent<UsernameFormElement>) => {
		e.preventDefault();

		const target = e.currentTarget.elements;

		const email = target.email.value.trim();
		const password = target.password.value.trim();

		const newErrors = {
			emailIsEmpty: !email,
			passwordIsEmpty: !password,
		};

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}

		const userData = { email, password };

		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		const data = await response.json();
		console.log(data);

		if (!response.ok) {
			alert(data.result);
		}

		if (data.successful) {
			const userToken = data.result.split(' ')[1];
			localStorage.setItem('userToken', userToken);

			target.email.value = '';
			target.password.value = '';

			navigate('/private');
		}
	};

	const resetError = () => {
		setErrors({
			emailIsEmpty: false,
			passwordIsEmpty: false,
		});
	};

	return (
		<form onSubmit={handleSubmit} onBlur={resetError} className={style.form}>
			<h2 className={style.formTitle}>Log in</h2>

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
						buttonText={'log in'}
						buttonType='submit'
					/>

					<span className={style.text}>
						If you don't have an account you may{' '}
						<Link className={style.link} to='/registration'>
							register
						</Link>
					</span>
				</div>
			</div>
		</form>
	);
};

export default Login;
