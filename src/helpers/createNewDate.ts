const createDate = () => {
	const date = new Date();
	const [d, m, y] = [
		date.getDate().toString(),
		(date.getMonth() + 1).toString(),
		date.getFullYear().toString(),
	];

	const newDate = `${+d < 10 ? '0' + d : d}/${+m < 10 ? '0' + m : m}/${y}`;

	return newDate;
};

export default createDate;
