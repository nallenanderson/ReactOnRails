import 'whatwg-fetch';

const baseUrl = 'https://simple-server-nate.herokuapp.com/db';

const headers = {
	'accept': 'application/json',
	'content-type': 'application/json'
};

const getResponse = (uri) => {
	return fetch(`${baseUrl}/`, {
		headers
	}).then(res => res.json())
		.then(data => data[uri]);
};

const handleErrors = (response) => {
	if(response.status >= 200 && response.status < 400) {
		const sendResponse = { code: response.status, message: 'You are a total success!' };
		return sendResponse;
	} else {
		const sendResponse = { code: response.status || 500, message: 'You are a total failure!' };
		return sendResponse;
	}
};

const createResponse = (response) => {
	return fetch(`${baseUrl}/responses`, {
		method: 'POST',
		headers,
		body: JSON.stringify(response)
	})
		.then(handleErrors);
};

export { createResponse, getResponse, handleErrors };
