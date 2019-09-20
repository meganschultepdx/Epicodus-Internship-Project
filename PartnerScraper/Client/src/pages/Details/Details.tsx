import * as React from "react";
import { useGlobal } from "reactn";
import { useState, useEffect } from "react";
import PartnersAtAGlance from "./PartnersAtAGlance";
import ReusableButton from "../../shared/ReusableButton";
import ScanHistory from "./ScanHistory";

// Composite component that handles the logic to call to the backend API for database search results and will render the Overview & ScanHistory components
const Details = () => {
	const [upc, setUpc] = useGlobal("upc");
	const [details, setDetails] = useState([]);
	const [badResponse, setBadResponse] = useState(null);

	// This method acts as "componentDidMount" lifecycle method, by passing [details, upc] as the second argument you trigger the method after details/upc gets assigned a value.
	useEffect(() => {
		// If URL path changes this setUpc will need to be changed accordingly - Right now it cuts the /upc/ off the /upc/{url}
		setUpc(window.location.pathname.slice(5));
		getUpcDataFromBackend();
	}, [upc]); // UseEffect

	// Function gets scrape history from the database to render the Overview and ScanHistory components.
	const getUpcDataFromBackend = async () => {
		if (upc !== "") {
			try {
				const response = await fetch(
					`${process.env.BaseURL}${process.env.GetScansURL}${upc}`
				);

				if (!response.ok) {
					throw Error(response.statusText);
				} // if
				const json = await response.json();
				setDetails(json);
				// This catch assigns the error message to State so it can render the error on the page
			} catch (error) {
				setBadResponse(error.toString());
			} // catch
		} // if
	}; //getUpcDataFromBackend

	// This checks for if there is a JSON for the Overview andScanHistory component to work with before it renders the ScanHistory and Overview components.
	const renderScanHistory = () => {
		let scanHistory;
		// Checks if there was an error and returns a Error message if so
		if (badResponse !== null) {
			scanHistory = <p className="badResponse">{badResponse}</p>;
			// Then it checks if there are is content in the array of Data pulled from the backend, if so it returns Overview and ScanHistory components for rendering
		} else if (details.length > 0) {
			// PartnersAtAGlance is given just the most recent search result ScanHistory is handed down the entire array of search results
			scanHistory = (
				<React.Fragment>
					<PartnersAtAGlance data={details[0]} handleScanOnClick={handleScan} />
					<ScanHistory scanHistory={details} />
				</React.Fragment>
			);
			// If it successfully searched but returned nothing this will render a message.
		} else {
			scanHistory = <div id="noResults">
				<p>There is no scan history for UPC {upc}</p>
				<ReusableButton
					className="scrapeButton"
					label="SCRAPE NOW!"
					handleOnClick={handleScan}
					type="button"
				/>
			</div>;

		} // else
		return scanHistory;
	}; // renderScanHistory

	// Function that will initialize new Scan for updated Scrapes, it is initialized in ReusableButton in child components
	const handleScan = async () => {
		// Makes api call to backend to run a new scan
		try {
			const response = await fetch(
				`${process.env.BaseURL}${process.env.StartScanURL}${upc}`
			);
			if (!response.ok) {
				throw Error(response.statusText);
			}
			// After scan succeeds the page refreshes to read newest scan data
			location.reload();
			// catch assigns the error to state value so it can be displayed on screen
		} catch (error) {
			setBadResponse(error.toString());
		} // catch
	}; // handleScan

	return <React.Fragment>{renderScanHistory()}</React.Fragment>; // return
}; // Details

export default Details;
