import { FC, useEffect, useState } from "react";
import "./Main.css";
import Current from "../Components/Current/Current";
import Header from "../Components/Header/Header";
import Weekly from "../Components/Weekly/Weekly";
import Hourly from "../Components/Hourly/Hourly";
import Loader from "../Components/Loader/Loader";
import Search from "../Components/Search/Search";
interface ApiData {
	dt: any;
	main: any;
	name: string;
	weather: any;
	sys: any;
	daily: any;
	hourly: any;
}
interface weather {
	main?: string;
}
interface CurrentData {
	coord: any;
	weather: Array<weather>;
	main: any;
	dt: any;
	name: any;
	sys: any;
}

const Main: FC = () => {
	const [location, setLocation] = useState({ lat: 0, lon: 0 });
	const [apiData, setApiData] = useState<ApiData>();
	const [currentData, setCurrentData] = useState<CurrentData>({
		coord: "",
		weather: [],
		main: "",
		dt: "",
		name: "",
		sys: "",
	});
	const [isLoading, setIsLoading] = useState(true);
	const [city, setCity] = useState("");
	const apiUrl: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&include=daily&appid=e3a4e39f4c824772f7d35bc0b095f245&units=metric`;
	const cityUrl: string = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=e3a4e39f4c824772f7d35bc0b095f245`;
	const currentUrl: string = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=628f60b5b499c1b0491f056ab8984168&units=metric`;

	useEffect(() => {
		if ("geolocation" in navigator) {
			if (location.lat === 0 && location.lon === 0) {
				console.log("fired1");
				navigator.geolocation.getCurrentPosition((position) => {
					setLocation({
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					});
				});
			}
		}
	}, [location]);
	useEffect(() => {
		if (location.lat !== 0 && location.lon !== 0) {
			console.log("fired2");
			fetch(currentUrl)
				.then((res) => res.json())
				.then((data) => setCurrentData(data));

			console.log("fired3");
			fetch(apiUrl)
				.then((res) => res.json())
				.then((data) => {
					setApiData(data);
				});
		}
	}, [apiUrl, currentUrl, location]);

	setTimeout(() => {
		setIsLoading(false);
	}, 2500);

	useEffect(() => {
		if (city) {
			console.log("fired4");
			fetch(cityUrl)
				.then((res) => res.json())
				.then((data) => {
					setLocation({ lat: data[0].lat, lon: data[0].lon });
				});
		}
	}, [city, cityUrl]);

	return isLoading ? (
		<Loader />
	) : (
		<div className="main">
			<Header />
			<Search setCity={setCity} />
			<Current currentWeather={currentData} />
			<Weekly weeklyWeather={apiData && apiData.daily} />
			<Hourly hourlyWeather={apiData && apiData.hourly} />
		</div>
	);
};

export default Main;
