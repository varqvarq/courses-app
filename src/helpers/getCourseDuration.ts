const getDuration = (duration: number): string => {
	let hh = Math.floor(duration / 60).toString();
	let mm = (duration % 60).toString();

	hh = +hh < 10 ? `0${hh}` : hh;

	mm = +mm < 10 ? `0${mm}` : mm;

	switch (+hh) {
		case 1:
			return `${hh}:${mm} hour`;
		case 0:
			return `${hh}:${mm} minutes`;
		default:
			return `${hh}:${mm} hours`;
	}
};

export default getDuration;
