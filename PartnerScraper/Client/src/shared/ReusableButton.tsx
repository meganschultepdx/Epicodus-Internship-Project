import * as React from "react";

// Reusable button component with onClick event and label that can be controlled via props
const ReusableButton = (props: any) => {
	return (
		<button
			className={props.className}
			onClick={props.handleOnClick}
			type={props.type}
		>
			{props.label}
		</button>
	);
}; // ReusableButton

export default ReusableButton;
