import "./City.css";

const City = () => {
	return (
		<div className="container">
			<div className="card-body text-center">
				<span className="card-date">Today</span>
				<span
					className="card-weather-emoji"
					role="img"
					aria-label="broken clouds"
					title="broken clouds"
				>
					☁️
				</span>
				<div className="card-degree">
					<span className="card-degree">32°C</span>
				</div>
			</div>
		</div>
	);
};

export default City;
