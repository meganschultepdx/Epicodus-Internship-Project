import * as React from "react";
import { Link } from "react-router-dom";
const wienerDog = require('../assets/img/wiener-dog.png');

// This component will render in the headerContainer, provide a logo image and title and link back to details/home page
const Logo = () => {
	return (
		<div className="logoTitle">
			<Link to="/" className="title">
				<img
					width="auto"
					height="110"
					src={wienerDog}
					alt="wiener dog"
					id="wienerDog"
				/>
				<br />
				Partner Scraper
			</Link>
		</div>
	);
}; // Logo

export default Logo;
