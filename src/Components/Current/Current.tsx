import React, { memo, FC, useState, useEffect } from "react";
import Loader from "../Loader/Loader";

interface ApiData {
	dt: any;
	main: any;
	name: string;
	weather: any;
	sys: any;
}

const Current: FC = () => {
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	const [apiData, setApiData] = useState<ApiData>();
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
	return (
		<div className="container">
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
				Current
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

			{apiData ? (
				<div
					className="current"
					style={{
						marginTop: "25px",
						display: "flex",
						justifyContent: "space-evenly",
						flexDirection: "row",
						width: "100%",
					}}
				>
					<div
						className="left"
						style={{
							marginTop: "35px",
							display: "flex",
							justifyContent: "center",
							backgroundColor: "rgb(255, 255, 255, 0.3)",
							width: "300px",
							height: "180px",
							borderRadius: "15px",
						}}
					>
						<div
							className="location"
							style={{
								display: "flex",
								justifyContent: "space-around",
								flexDirection: "column",
								color: "rgb(0,0,0,0.85)",
							}}
						>
							<div style={{ fontSize: "35px", marginBottom: "15px" }}>
								{apiData.name}
								{", "}
								{apiData.sys.country}
							</div>
						</div>
						<div className="date">
							<div
								style={{
									fontSize: "20px",
									marginTop: "0%",
									fontWeight: "bolder",
									textAlign: "center",
									color: "rgb(0,0,0,0.85)",
								}}
							>
								{new Date(apiData.dt * 1000).toDateString()}
							</div>
						</div>
					</div>
					<div
						className="left"
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "35px",
							backgroundColor: "rgb(255, 255, 255, 0.3)",
							width: "300px",
							height: "180px",
							borderRadius: "15px",
						}}
					>
						<div
							className="location"
							style={{
								display: "flex",
								justifyContent: "space-around",
								flexDirection: "column",
							}}
						>
							<div
								style={{
									fontSize: "35px",
									marginBottom: "15px",
									color: "rgb(0,0,0,0.85)",
								}}
							>
								{apiData.main.temp}&deg;
								{"C"}
							</div>
						</div>
						<div className="date">
							<div
								style={{
									fontSize: "20px",
									marginTop: "0%",
									color: "rgb(0,0,0,0.85)",
									fontWeight: "bolder",
									textAlign: "center",
								}}
							>
								{apiData.weather[0].main}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};
export default memo(Current);
