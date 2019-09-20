import * as React from "react";
import Logo from "../shared/Logo";
import NavLink from "../shared/NavLink";
import SearchContainer from "./SearchContainer";
import { withRouter } from "react-router-dom";

// Composite component that will render child components
const HeaderContainer = (props: any) => {
	return (
		<header className="headerContainer">
			<div className="logoNavLinkGrouping">
				<Logo />
				<NavLink />
			</div>
			<SearchContainer history={props.history} />
		</header>
	);
}; //HeaderContainer

export default withRouter(HeaderContainer);
