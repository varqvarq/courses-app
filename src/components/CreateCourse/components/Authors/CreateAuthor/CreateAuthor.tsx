import { useState } from 'react';
import uuid from 'react-uuid';

import style from './CreateAuthor.module.scss';

import Input from '../../../../../common/Input/Input';
import Button from '../../../../../common/Button/Button';
import { IAuthor } from '../../../../Courses/Courses';

interface CreateAuthorProps {
	onCreate: (author: IAuthor) => void;
}

const CreateAuthor: React.FC<CreateAuthorProps> = ({ onCreate }) => {
	const [authorName, setAuthorName] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAuthorName(e.target.value);
	};

	const handleCreation = () => {
		if (!authorName.trim()) {
			setAuthorName('');
			return;
		}
		const newAuthor: IAuthor = {
			name: authorName,
			id: uuid(),
		};

		onCreate(newAuthor);
		setAuthorName('');
	};

	return (
		<Input
			inputId={'authorName'}
			labelText={'author name'}
			inputType={'text'}
			className={style.createAuthor}
			inputClassName={style.createAuthorInput}
			labelType={'small'}
			value={authorName}
			onChange={handleInputChange}
			rightElement={
				<Button
					className={style.createAuthorButton}
					buttonText={'create author'}
					onClick={handleCreation}
				/>
			}
		/>
	);
};

export default CreateAuthor;
