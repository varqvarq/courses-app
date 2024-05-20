import Button from '../../../../common/Button/Button';
import style from './AuthorItem.module.scss';

interface Props {
	authorName: string;
	addButton?: boolean;
	deleteButton?: boolean;
	onDelete?: () => void;
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

			{props.deleteButton && (
				<>
					<Button
						className={`${style.deleteButton} ${style.button}`}
						onClick={props.onDelete}
					/>
				</>
			)}
		</div>
	);
};

export default AuthorItem;
