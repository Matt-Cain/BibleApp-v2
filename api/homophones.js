import axios from "axios";

// api to get homophones

const getHomophones = (payload) => {
	const apiUrl = `https://api.datamuse.com/words?sl=${payload}&max=10`;

	return axios({
		method: "get",
		url: apiUrl,
	});
}

export default getHomophones;