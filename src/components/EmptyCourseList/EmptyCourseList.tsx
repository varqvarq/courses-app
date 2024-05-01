import React from 'react';
import Button from '../../common/Button/Button';

import style from './EmptyCourseList.module.scss';

export default function EmptyCourseList() {
	return (
		<>
			<div className={style.container}>
				<h2 className={style.heading}>Course List is Empty</h2>
				<h3 className={style.subheading}>
					Please use "Add New Course" button to add your first course
				</h3>
				<Button
					className={`button ${style.button}`}
					buttonText='Add New Course'
					onClick={() => console.log()}
				/>
			</div>
		</>
	);
}
