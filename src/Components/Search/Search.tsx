import React, {
	Dispatch,
	FC,
	,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import cities from "../../cities.json";
import "./Search.css";
interface Props {
	setCity: Dispatch<SetStateAction<string>>;
}

const Search: FC<Props> = (props) => {
	const [input, setInput] = useState("");
	const [searchedCities, setSearchedCities] = useState<Array<String>>([]);
	const searchedCity = cities.filter((data) =>
		data.name.toLowerCase().includes(input.toLowerCase())
	);

	const inputHandler = (event: any) => {
		setInput(event.target.value);
	};

	const clickEvent = (event: any) => {
		const input = event.target as HTMLLIElement;
		props.setCity(input.innerText);
		let existingCities: Array<String> = [];
		localStorage.getItem("cities") !== null &&
			JSON.parse(localStorage.getItem("cities") || "").map((data: any) =>
				existingCities.push(data)
			);

		existingCities.length < 3
			? existingCities.push(input.innerText)
			: existingCities.shift();

		existingCities.push(input.innerText);

		let newCities = existingCities && new Set(existingCities);
		let uniqueCities = Array.from(newCities);
		localStorage.setItem("cities", JSON.stringify(uniqueCities));
		uniqueCities && setSearchedCities(uniqueCities);
		setInput("");
	};

	const clickEvent2 = (event: any) => {
		const input = event.target as HTMLDivElement;
		props.setCity(input.innerText);
		let existingCities: Array<String> = [];
		localStorage.getItem("cities") !== null &&
			JSON.parse(localStorage.getItem("cities") || "").map((data: any) =>
				existingCities.push(data)
			);

		existingCities.length < 3
			? existingCities.push(input.innerText)
			: existingCities.shift();

		existingCities.push(input.innerText);

		let newCities = existingCities && new Set(existingCities);
		let uniqueCities = Array.from(newCities);
		localStorage.setItem("cities", JSON.stringify(uniqueCities));
		uniqueCities && setSearchedCities(uniqueCities);
		setInput("");
	};

	let searchList =
		input.length > 1 ? "suggestions inputsearch" : "no-suggestions inputsearch";

	useEffect(() => {
		let searchedCities =
			localStorage.getItem("cities") &&
			JSON.parse(localStorage.getItem("cities") || "");
		let newCities = searchedCities && new Set(searchedCities);
		newCities = newCities && Array.from(newCities);
		setSearchedCities(newCities);
	}, []);

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
				}}
			>
				<div>
					<input
						className="user-input"
						type="text"
						placeholder="Search city here"
						style={{
							width: "100%",
							marginRight: "10px",
							marginTop: "50px",
							padding: "15px",
						}}
						onChange={inputHandler}
					/>
					{input.length > 1 ? (
						<ul
							className={searchList}
							style={{
								backgroundColor: "rgb(255, 255, 255, 0.3)",
								border: "0px",
								width: "100%",
								overflowX: "hidden",
								overflowY: "hidden",
							}}
						>
							{searchedCity.map((data) => (
								<li
									key={data.id}
									onClick={(e: React.MouseEvent<HTMLLIElement>) =>
										clickEvent(e)
									}
									style={{
										backgroundColor: "rgb(255, 255, 255, 0.3)",
										width: "100%",
										border: "0px",
										overflowX: "hidden",
									}}
								>
									{data.name}
								</li>
							))}
						</ul>
					) : (
						<></>
					)}
				</div>
				<i onClick={() => setInput("")}></i>
			</div>
			{searchedCities && searchedCities.length > 0 ? (
				<div
					style={{
						marginTop: "30px",
						display: "flex",
						justifyContent: "center",
						margin: "5px",
						alignItems: "center",
						backgroundColor: "rgb(255, 255, 255, 0.3)",
						marginLeft: "50px",
						paddingLeft: "20px",
						borderRadius: "15px",
					}}
				>
					<p style={{ fontWeight: "bolder" }}>History : </p>
					{searchedCities.map((data: any) => (
						<div
							className="recent"
							onClick={(e: React.MouseEvent<HTMLDivElement>) => clickEvent2(e)}
							style={{
								display: "flex",
								justifyContent: "space-evenly",
								background: "rgba(255, 255, 255, 0.8)",
								height: "35px",
								margin: "5px",
								padding: "5px",
								borderRadius: "10px",
								textAlign: "center",
								alignItems: "center",
								marginRight: "20px",
								fontWeight: "bolder",
							}}
						>
							{data}
						</div>
					))}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};
export default (Search);
