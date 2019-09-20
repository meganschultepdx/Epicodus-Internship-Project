import * as React from "react";
import { Link } from "react-router-dom";

// functional component that will route to dataset page
const NavLink = () => {
	return (
		<div className="navLinkPlacement">
			<Link to="/dataset" className="datasetLinkStyling">
				| Dataset |
			</Link>
		</div>
	);
}; // NavLink

export default NavLink;
