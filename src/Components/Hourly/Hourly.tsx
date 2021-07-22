import { FC, memo, useState, useEffect } from "react";
import "./Hourly.css";

interface ApiData {
	hourly: any;
	weather: any;
}

const Hourly: FC = () => {
	const [apiData, setApiData] = useState<ApiData>();
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	const date: Date = new Date();
	const today = date.toLocaleDateString();
	const tomorrow: Date = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowDate = tomorrow.toLocaleDateString();
	const apiUrl: string = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely,current&appid=628f60b5b499c1b0491f056ab8984168&units=metric`;

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
	console.log(apiData);
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
				Hourly Forecast
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
				className="scroll"
				style={{
					display: "flex",
					overflow: "overlay",
					overflowY: "hidden",
					justifyContent: "space-between",
					listStyle: "none",
					paddingLeft: "0px",
					whiteSpace: "nowrap",
					margin: 0,
					height: "240px",
				}}
			>
				{apiData &&
					apiData.hourly.map((data: any) => {
						return (
							<li key={data.dt} style={{ padding: "15px" }}>
								<span
									style={{
										height: "180px",
										width: "180px",
										display: "flex",
										flexDirection: "column",
										borderRadius: "10px",
										background: "rgba(255, 255, 255, 0.28)",
										textAlign: "center",
									}}
								>
									<p
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											fontWeight: "bolder",
											fontSize: "20px",
										}}
									>
										{new Date(data.dt * 1000).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
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
											🌡️ {data.temp}
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
											<div
												style={{
													display: "flex",
													justifyContent: "space-evenly",
													flexDirection: "row",
												}}
											>
												☁️
											</div>
											<div
												style={{
													display: "flex",
													justifyContent: "space-evenly",
													flexDirection: "row",
												}}
											>
												{data.clouds}
											</div>
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
export default memo(Hourly);
