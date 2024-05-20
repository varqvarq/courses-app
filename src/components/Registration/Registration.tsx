import { useState } from 'react';

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
	const [errors, setErrors] = useState({
		nameIsEmpty: false,
		emailIsEmpty: false,
		passwordIsEmpty: false,
	});

	const handleSubmit = (e: React.FormEvent<UsernameFormElement>) => {
		e.preventDefault();

		const target = e.currentTarget.elements;

		const name = target.name.value.trim();
		const email = target.email.value.trim();
		const password = target.password.value.trim();

		setErrors({
			nameIsEmpty: !name,
			emailIsEmpty: !email,
			passwordIsEmpty: !password,
		});
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
						Name is required
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
						<a className={style.link} href='#'>
							log in
						</a>
					</span>
				</div>
			</div>
		</form>
	);
};

export default Registration;
