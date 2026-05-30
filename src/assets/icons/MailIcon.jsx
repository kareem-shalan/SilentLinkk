function MailIcon({ className }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden="true"
		>
			<rect
				x="3.5"
				y="6"
				width="17"
				height="12"
				rx="2"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M4 7.5l8 5 8-5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default MailIcon;
