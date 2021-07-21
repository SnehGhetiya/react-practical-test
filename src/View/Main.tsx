import React, { FC, useState, useEffect, memo } from "react";
import "./Main.css";

interface apiData {
	weather: any;
	temp: any;
	main: any;
	current: any;
	wind: any;
	clouds: any;
	sys: any;
	name: any;
}

const Main: FC = () => {
	const [lat, setLat] = useState<number>();
	const [lon, setLon] = useState<number>();
	const [apiData, setApiData] = useState<apiData>();
	const [city, setCity] = useState("");
	const [tempCity, setTempCity] = useState("");
	const [daily, setDaily] = useState<object>();
	const date: Date = new Date();
	const apiUrl: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&include=hourly&exclude=minutely&appid=628f60b5b499c1b0491f056ab8984168&units=metric`;
	const cityApi: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=628f60b5b499c1b0491f056ab8984168`;
	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLat(position.coords.latitude);
				setLon(position.coords.longitude);
			});
			fetch(apiUrl)
				.then((res) => res.json())
				.then((data) => {
					setCity(data.name);
					console.log(data.name);
				});
		}
	}, [city, cityApi]);

	useEffect(() => {
		if (lat && lon && city !== null) {
			fetch(apiUrl)
				.then((res) => res.json())
				.then((data) => {
					setApiData(data);
					setDaily(data.daily);
				});
		}
	}, [lat, lon, apiUrl, city]);
	console.log(daily);

	const inputHandler = (e: any) => {
		setTempCity(e.target.value);
		console.log(e.target.value);
	};

	const buttonHandler = (e: any) => {
		setCity(tempCity);
		console.log(city);
	};

	return (
		<div className="main">
			<div className="title-div">
				<p className="title">React Weather App</p>
			</div>
			<div className="wrap">
				<div className="search">
					<input
						type="text"
						className="searchTerm"
						placeholder="Enter city here"
						value={city}
						onChange={(e: any) => inputHandler(e)}
					/>
					<button className="searchButton">Search</button>
				</div>

				{apiData ? (
					<div id="weather_wrapper">
						<div className="weatherCard">
							<div className="currentTemp">
								<span className="temp">{apiData.current.temp}&deg;</span>
								<span className="location">{city}</span>
							</div>
							<div className="currentWeather">
								<span className="image-container">
									<img
										src={`http://openweathermap.org/img/w/${apiData.current.weather[0].icon}.png`}
										alt="Weather Icon"
										className="weather-icon"
									/>
								</span>
								<div className="info">
									<span className="rain">
										{apiData.current.weather[0].main}
									</span>
									<span className="wind">{date.toDateString()}</span>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
};

export default memo(Main);
