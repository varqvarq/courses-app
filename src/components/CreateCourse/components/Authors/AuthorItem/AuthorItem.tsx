import Button from '../../../../../common/Button/Button';
import style from './AuthorItem.module.scss';

interface Props {
	authorName: string;
	addButton?: boolean;
	removeButton?: boolean;
	onRemove?: () => void;
	onAdd?: () => void;
}

const AuthorItem: React.FC<Props> = (props) => {
	return (
		<div className={style.authorItem}>
			<p className={style.authorName}>{props.authorName}</p>
			{props.addButton && (
				<>
					<Button
						className={`${style.addButton} ${style.button}`}
						onClick={props.onAdd}
					/>
				</>
			)}

			{props.removeButton && (
				<>
					<Button
						className={`${style.removeButton} ${style.button}`}
						onClick={props.onRemove}
					/>
				</>
			)}
		</div>
	);
};

export default AuthorItem;
