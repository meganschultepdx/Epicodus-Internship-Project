import * as React from "react";

// This component will render a red X to indicate a negative result
const FirstPageIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            transform="scale(.5, .5) scale(-1,1)"
        >
            <path
                d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z"
            />
        </svg>
    );
}; // FirstPageIcon

export default FirstPageIcon;
