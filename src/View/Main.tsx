import { FC, memo, useEffect, useState } from "react";
import "./Main.css";
import Current from "../Components/Current/Current";
import Header from "../Components/Header/Header";
import Weekly from "../Components/Weekly/Weekly";
import Hourly from "../Components/Hourly/Hourly";
import Loader from "../Components/Loader/Loader";
interface ApiData {
	dt: any;
	main: any;
	name: string;
	weather: any;
	sys: any;
}

const Main: FC = () => {
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	const [apiData, setApiData] = useState<ApiData>();
	const [isLoading, setIsLoading] = useState(true);
	const apiUrl: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=628f60b5b499c1b0491f056ab8984168&units=metric`;
	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLat(position.coords.latitude);
				setLon(position.coords.longitude);
			});
			fetch(apiUrl)
				.then((res) => res.json())
				.then((data) => {
					setApiData(data);
				});
		}
	}, [lat, lon]);

	setTimeout(() => {
		setIsLoading(false);
	}, 2500);

	return isLoading ? (
		<Loader />
	) : (
		<div className="main">
			<Header />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "85px",
					listStyle: "none",
					whiteSpace: "nowrap",
					overflow: "hidden",
					borderRadius: "15px",
				}}
			>
				<input
					className="user-input"
					type="text"
					placeholder="Search city here"
				/>
			</div>
			<Current />
			<Weekly />
			<Hourly />
		</div>
	);
};

export default memo(Main);
