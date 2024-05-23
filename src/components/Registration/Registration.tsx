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

const initialErrors = {
	nameError: '',
	emailError: '',
	passwordError: '',
};

const Registration: React.FC = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState(initialErrors);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent<UsernameFormElement>) => {
		e.preventDefault();

		const target = e.currentTarget.elements;

		const name = target.name.value.trim();
		const email = target.email.value.trim();
		const password = target.password.value.trim();

		const newErrors = {
			nameError: name ? '' : 'Name is required',
			emailError: email ? '' : 'Email is required',
			passwordError: !password
				? 'Password required'
				: password.length < 6
					? 'Password lenght should be at least 6 characters'
					: '',
		};

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}

		const userData = { name, email: email.toLowerCase(), password };

		try {
			const response = await fetch('http://localhost:4000/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			const data = await response.json();

			if (!response) {
				alert('server is not available');
			}

			if (!response.ok) {
				alert(data.errors);
				return;
			}

			target.name.value = '';
			target.email.value = '';
			target.password.value = '';
			// navigate('/login');
			setSuccess(true);
		} catch (e) {
			alert(e);
		}
	};

	const resetErrors = () => {
		setErrors(initialErrors);
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
						className={style.inputElement}
						inputClassName={style.input}
						errorMessage={errors.nameError}
					/>

					<Input
						inputId={'email'}
						labelText={'email'}
						inputType={'email'}
						className={style.inputElement}
						inputClassName={style.input}
						errorMessage={errors.emailError}
					/>

					<Input
						inputId={'password'}
						labelText={'password'}
						inputType={'password'}
						className={style.inputElement}
						inputClassName={style.input}
						errorMessage={errors.passwordError}
					/>

					<Button
						className={style.button}
						buttonText={'register'}
						buttonType='submit'
					/>

					<span className={`${style.bottomText} ${success && style.green}`}>
						{success
							? 'Registration сompleted successfuly now you can '
							: 'If you have an account you may '}
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
