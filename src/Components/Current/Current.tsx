import { FC } from "react";
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

interface Props {
	currentWeather: CurrentData;
}

const Current: FC<Props> = (props) => {
	const envir = props.currentWeather?.weather.map(({ main }) => main);
	console.log(props.currentWeather?.weather.map(({ main }) => main));

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
							{props.currentWeather.name}
							{", "}
							{props.currentWeather.sys.country}
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
							{new Date(props.currentWeather.dt * 1000).toDateString()}
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
							{props.currentWeather.main.temp}&deg;
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
							{envir[0]}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Current;
