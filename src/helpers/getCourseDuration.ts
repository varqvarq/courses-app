const getDuration = (duration: number): string => {
	let hh = Math.floor(duration / 60).toString();
	let mm = (duration % 60).toString();

	hh = +hh < 10 ? `0${hh}` : hh;

	mm = +mm < 10 ? `0${mm}` : mm;

	return +hh === 1 ? `${hh}:${mm} hour` : `${hh}:${mm} hours`;
};

export default getDuration;
