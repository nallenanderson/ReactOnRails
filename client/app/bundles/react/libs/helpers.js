import { createResponse, getResponse, handleErrors } from './servicesHelpers';

const getIndex = (list, updated) => list.findIndex(item => item.id === updated.id);

const updateList = (list, updated) => {
  const updatedIndex = getIndex(list, updated);
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ]
};

const markLesser = (list, updated, value) => {
	const itemIndex = getIndex(list, updated);
	const newList = [...list];

	let i = 0;
	while ( i <= itemIndex ) {
		newList[i].selected = value;
		i++;
	}

	while ( i > itemIndex && i < newList.length ) {
		newList[i].selected = false;
		i++;
	}

	return newList;
};

export { updateList, createResponse, getResponse, markLesser, getIndex, handleErrors };
