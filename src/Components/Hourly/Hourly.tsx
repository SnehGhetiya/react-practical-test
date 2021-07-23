import { FC, memo } from "react";
import "./Hourly.css";

interface HourlyData {
	hourly: any;
}

interface Props {
	hourlyWeather: Array<HourlyData>;
}

const Hourly: FC<Props> = (props) => {
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
				{props.hourlyWeather &&
					props.hourlyWeather.map((data: any) => {
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
