import * as React from "react";
import * as ReactDOM from "react-dom";
import * as RoutesModule from "./routes";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";
import { setGlobal } from "reactn";
import "./src/styles/styles.scss";
import HeaderContainer from "../Client/src/shared/HeaderContainer";

let routes: object = RoutesModule.routes;

setGlobal({
	url: "",
	upc: ""
});

// Home page should probably be the 'data dump'
const render = () => {
	ReactDOM.render(
		<AppContainer>
			<Router>
				<div>
					<HeaderContainer />
					{routes}
				</div>
			</Router>
		</AppContainer>,
		document.getElementById("app")
	);
};

render();

if (process.env.HotReloading == true) {
	(module as any).hot.accept("./routes", () => {
		routes = require<typeof RoutesModule>("./routes");
		render();
	});
}
