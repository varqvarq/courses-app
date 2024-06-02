import Input from '../Input/Input';
import Button from '../Button/Button';

import style from './SearchBar.module.scss';
import { useState } from 'react';
interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;

		if (!query) {
			onSearch('');
		}
		setSearchQuery(query.trim());
	};

	const handleSearch = () => {
		onSearch(searchQuery);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className={style.container}>
			<Input
				inputId={'searchInput'}
				inputType={'text'}
				className={style.search}
				inputClassName={style.searchInput}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				wrap
				rightElement={
					<Button
						buttonText={'search'}
						className={style.button}
						onClick={handleSearch}
					/>
				}
			/>
		</div>
	);
};

export default SearchBar;
