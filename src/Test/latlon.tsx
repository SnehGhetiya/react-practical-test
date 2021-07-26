import axios from "axios";

export const fetch = async () =>
	await axios.get(
		"https://api.openweathermap.org/data/2.5/onecall?lat=23.04&lon=72.6666&exclude=daily,monthly,minutely&appid=e3a4e39f4c824772f7d35bc0b095f245&units=metric"
	);
