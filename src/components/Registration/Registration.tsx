import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import style from './Registration.module.scss';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

interface FormElements extends HTMLFormControlsCollection {
	name: HTMLInputElement;
	email: HTMLInputElement;
	password: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

const Registration: React.FC = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({
		nameIsEmpty: false,
		emailIsEmpty: false,
		passwordIsEmpty: false,
	});

	const handleSubmit = async (e: React.FormEvent<UsernameFormElement>) => {
		e.preventDefault();

		const target = e.currentTarget.elements;

		const name = target.name.value.trim();
		const email = target.email.value.trim();
		const password = target.password.value.trim();

		const newErrors = {
			nameIsEmpty: !name,
			emailIsEmpty: !email,
			passwordIsEmpty: !password,
		};

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}

		const userData = { name, email, password };

		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		const data = await response.json();

		if (!response.ok) {
			alert(data.errors);
			return;
		}

		target.name.value = '';
		target.email.value = '';
		target.password.value = '';
		navigate('/login');
	};

	const resetErrors = () => {
		setErrors({
			nameIsEmpty: false,
			emailIsEmpty: false,
			passwordIsEmpty: false,
		});
	};

	return (
		<form onSubmit={handleSubmit} onBlur={resetErrors} className={style.form}>
			<h2 className={style.formTitle}>Registration</h2>

			<div className={style.formContent}>
				<div className={style.formContent__wrapper}>
					<Input
						inputId={'name'}
						labelText={'name'}
						inputType={'text'}
						className={`${errors.nameIsEmpty && style.error}`}
					/>

					<span
						className={`${style.errorMessage} ${errors.nameIsEmpty && style.active}`}
					>
						Names is required
					</span>

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
						buttonText={'register'}
						buttonType='submit'
					/>

					<span>
						If you have an account you may{' '}
						<Link className={style.link} to='/login'>
							log in
						</Link>
					</span>
				</div>
			</div>
		</form>
	);
};

export default Registration;
