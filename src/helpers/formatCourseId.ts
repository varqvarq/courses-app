const formatId = (id: string) => {
	return id.split('-').slice(0, 3).join('-');
};

export default formatId;
