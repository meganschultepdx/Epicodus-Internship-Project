import * as React from "react";

// Input field component that will capture value of user input
// Input inside of label and on Blur are for accessibility
const TextInput = (props: any) => {
	const preventReload = (event: any) => {
		event.preventDefault();
	};

	return (
		<div className={props.className}>
			<label className="inputLabel">
				ENTER UPC <br />
				<input
					id={props.id}
					className={props.redBorder ? "redBorder" : "textInputField"}
					value={props.upc}
					placeholder="12 or 14 digits without spaces"
					onChange={props.onChange}
					onBlur={props.onBlur}
				/>
			</label>
		</div>
	);
}; // TextInput

export default TextInput;
