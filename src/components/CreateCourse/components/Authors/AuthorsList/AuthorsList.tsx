import { useState } from 'react';

import style from './AuthorsList.module.scss';

import { IAuthor } from '../../../../Courses/Courses';

import AuthorItem from '../AuthorItem/AuthorItem';

interface Props {
	authors: IAuthor[];
	onAdd: (id: string) => void;
	onRemove: (id: string) => void;
}

const AuthorsList: React.FC<Props> = ({ authors, onAdd, onRemove }) => {
	return (
		<div>
			<h4 className={style.authorsSubheading}>Authors List</h4>

			{authors.map((author) => {
				return (
					<AuthorItem
						key={author.id}
						authorName={author.name}
						addButton
						removeButton
						onRemove={() => onRemove(author.id)}
						onAdd={() => {
							onAdd(author.id);
						}}
					/>
				);
			})}
		</div>
	);
};

export default AuthorsList;
