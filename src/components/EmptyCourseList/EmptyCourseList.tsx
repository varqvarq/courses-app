import React from 'react';
import Button from '../../common/Button/Button';

export default function EmptyCourseList() {
	return (
		<>
			<h2>Course List is Empty</h2>
			<h3>Please use "Add New Course" button to add your first course</h3>
			<Button
				className='button'
				buttonText='Add New Course'
				onClick={() => console.log()}
			/>
		</>
	);
}
