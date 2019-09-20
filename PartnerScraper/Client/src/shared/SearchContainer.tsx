import * as React from "react";
import { useGlobal } from "reactn";
import { useState } from "react";
import ReusableButton from "./ReusableButton";
import TextInput from "./TextInput";

// Component that renders text input and button and receives upc state update as callback and routes to url of upc
const SearchContainer = (props: any) => {
	const [upc, setUpc] = useGlobal("upc");
	const [redBorder, setRedBorder] = useState(false);

	// Function that will run on key stroke to check input for a valid UPC format
	const handleChange = (e: any) => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			setRedBorder(false);
		} else {
			setRedBorder(true);
		} // else
	}; // handleChange(e)

	// Function handles form submission for input
	const handleOnSubmit = (event: any) => {
		event.preventDefault();
		const input = document.getElementById("inputField").value;
		setUpc(input);
		props.history.push(`/upc/${input}`);
	}; // handleOnSubmit(event)

	return (
		<div className="searchContainer">
			<form onSubmit={handleOnSubmit}>
				<TextInput
					className="textInputWrapper"
					value={upc}
					onChange={handleChange}
					onBlur={handleChange}
					redBorder={redBorder}
					id="inputField"
				/>
				<ReusableButton className="searchButton" label="Search" type="submit" />
			</form>
		</div>
	);
}; //SearchContainer

export default SearchContainer;
