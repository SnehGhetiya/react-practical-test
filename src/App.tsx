import React, { FC, memo } from "react";
import Main from "./View/Main";
import "./App.css";

const App: FC = () => {
	return (
		<div className="App">
			<Main />
		</div>
	);
};

export default memo(App);
