const formatDate = (date: string): string => {
	return date.replaceAll('/', '.');
};

export default formatDate;
