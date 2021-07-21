import React, { FC, memo } from "react";
import Main from "./View/Main";

const App: FC = () => {
	return (
		<div className="App">
			<Main />
		</div>
	);
};

export default memo(App);
