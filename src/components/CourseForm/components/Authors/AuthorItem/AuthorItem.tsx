import Button from '../../../../../common/Button/Button';
import style from './AuthorItem.module.scss';

interface Props {
	authorName: string;
	onRemove?: () => void;
	onAdd?: () => void;
}

const AuthorItem: React.FC<Props> = (props) => {
	return (
		<div className={style.authorItem}>
			<p className={style.authorName}>{props.authorName}</p>
			<div className={style.buttons}>
				{props.onAdd && (
					<Button
						className={`${style.addButton} ${style.button}`}
						onClick={props.onAdd}
					/>
				)}

				{props.onRemove && (
					<Button
						className={`${style.removeButton} ${style.button}`}
						onClick={props.onRemove}
					/>
				)}
			</div>
		</div>
	);
};

export default AuthorItem;
