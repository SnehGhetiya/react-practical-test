import axios from "axios";

export const fetch = async () =>
	await axios.get(
		"https://api.openweathermap.org/geo/1.0/direct?q=rajkot&appid=e3a4e39f4c824772f7d35bc0b095f245"
	);
