import axios from "axios";

export const fetch = async () =>
	await axios.get(
		"https://api.openweathermap.org/data/2.5/weather?lat=23.04&lon=72.6666&appid=628f60b5b499c1b0491f056ab8984168&units=metric"
	);
