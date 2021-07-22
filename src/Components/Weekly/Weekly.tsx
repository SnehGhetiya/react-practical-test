import React, { memo, FC, useState, useEffect } from "react";

interface ApiData {
	daily: any;
}

const Weekly: FC = () => {
	const [apiData, setApiData] = useState<ApiData>();
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	const apiUrl: string = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=628f60b5b499c1b0491f056ab8984168&units=metric`;
	const date: Date = new Date();
	const today = date.toLocaleDateString();
	const tomorrow: Date = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowDate = tomorrow.toLocaleDateString();

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
	}, [lat, lon, apiUrl]);

	return (
		<div
			style={{
				paddingLeft: "50px",
				paddingRight: "50px",
				paddingBottom: "50px",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<span
				style={{
					display: "block",
					marginLeft: "35px",
					marginTop: "50px",
					fontSize: "35px",
					fontWeight: "bolder",
					textAlign: "center",
				}}
			>
				Daily Forecast
				<hr
					style={{
						border: "0",
						height: "2px",
						background: "rgb(0,0,0)",
						marginBottom: "20px",
						width: "20%",
					}}
				/>
			</span>
			<ul
				style={{
					display: "flex",
					justifyContent: "space-around",
					listStyle: "none",
					paddingLeft: "0px",
					whiteSpace: "nowrap",
				}}
			>
				{apiData &&
					apiData.daily.map((data: any) => {
						return (
							<li
								key={data.dt}
								style={{
									marginTop: "25px",
									display: "flex",
									justifyContent: "space-around",
									listStyle: "none",
									paddingLeft: "0px",
									whiteSpace: "nowrap",
									overflow: "hidden",
									backgroundColor: "rgb(255, 255, 255, 0.3)",
									width: "10%",
									height: "20%",
									borderRadius: "15px",
								}}
							>
								<span>
									<p
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											fontWeight: "bolder",
											fontSize: "20px",
										}}
									>
										{new Date(data.dt * 1000).toLocaleDateString() === today
											? "Today"
											: new Date(data.dt * 1000).toLocaleDateString() ===
											  tomorrowDate
											? "Tomorrow"
											: new Date(data.dt * 1000).toLocaleDateString()}
									</p>
									<hr
										style={{
											border: "0",
											height: "2px",
											background: "rgb(0,0,0)",
											marginBottom: "20px",
										}}
									/>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "space-evenly",
											fontWeight: "bold",
											fontSize: "16px",
										}}
									>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												flexDirection: "column",
												marginBottom: "10px",
											}}
										>
											🌡️ {data.temp.day}
										</div>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												flexDirection: "column",
												marginBottom: "10px",
											}}
										>
											💧 {data.humidity}
										</div>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												flexDirection: "column",
												marginBottom: "10px",
											}}
										>
											☀️ {new Date(data.sunrise * 1000).toLocaleTimeString()}
										</div>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												flexDirection: "column",
												marginBottom: "10px",
											}}
										>
											🌘 {new Date(data.sunset * 1000).toLocaleTimeString()}
										</div>
									</div>
								</span>
							</li>
						);
					})}
			</ul>
		</div>
	);
};
export default memo(Weekly);
