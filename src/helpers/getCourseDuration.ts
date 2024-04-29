export default function getDuration(duration: number): string {
	let hour = Math.floor(duration / 60).toString();
	let minutes = (duration % 60).toString();

	if (+hour < 10) {
		hour = '0' + hour;
	}

	if (+minutes < 10) {
		minutes = '0' + minutes;
	}

	if (+hour === 1) {
		return `${hour}:${minutes} hour`;
	}

	return `${hour}:${minutes} hours`;
}
