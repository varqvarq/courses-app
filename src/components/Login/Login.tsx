import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import style from './Login.module.scss';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { useAppDispatch } from '../../hooks/useTypedSelector';
import { setUser, UserType } from '../../store/user/userSlice';

interface FormElements extends HTMLFormControlsCollection {
	email: HTMLInputElement;
	password: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

const initialErrors = {
	emailError: '',
	passwordError: '',
};

export const Login: React.FC = () => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState(initialErrors);
	const [disabled, setDisabled] = useState(false);

	const dispatch = useAppDispatch();

	const handleSubmit = async (e: React.FormEvent<UsernameFormElement>) => {
		e.preventDefault();

		const target = e.currentTarget.elements;
		const email = target.email.value.trim();
		const password = target.password.value.trim();

		const newErrors = {
			emailError: email ? '' : 'Email required',
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

		const userData = { email: email.toLowerCase(), password };

		try {
			setDisabled(true);

			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			const data = await response.json();

			if (!response.ok) {
				setDisabled(false);
				alert(data.result);
				return;
			}

			const userInfo: UserType = {
				isAuth: true,
				name: data.user.name,
				email: data.user.email,
				token: data.result,
				role: 'user',
			};

			dispatch(setUser(userInfo));

			localStorage.setItem('userToken', userInfo.token);

			target.email.value = '';
			target.password.value = '';
			navigate('/');
		} catch (e) {
			setDisabled(false);
			alert(e);
			return;
		}
	};

	const resetError = () => {
		setErrors(initialErrors);
	};

	return (
		<form onSubmit={handleSubmit} onBlur={resetError} className={style.form}>
			<h2 className={style.formTitle}>Log in</h2>

			<div className={style.formContent}>
				<div className={style.formContentWrapper}>
					<Input
						inputId={'email'}
						labelText={'email'}
						inputType={'email'}
						className={style.email}
						inputClassName={style.emailInput}
						errorMessage={errors.emailError}
					/>
					<Input
						inputId={'password'}
						labelText={'password'}
						inputType={'password'}
						className={style.password}
						inputClassName={style.passwordInput}
						errorMessage={errors.passwordError}
					/>

					<Button
						className={style.button}
						buttonText={'log in'}
						buttonType='submit'
						disabled={disabled}
					/>

					<span className={style.text}>
						If you don't have an account you may{' '}
						<Link className={style.link} to='/register'>
							register
						</Link>
					</span>
				</div>
			</div>
		</form>
	);
};

export default Login;
