function PhoneIcon({ className }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden="true"
		>
			<path
				d="M5.64 4.02a1.45 1.45 0 0 1 1.55-.3l2.2.9a1.45 1.45 0 0 1 .86 1.34l.02 1.9c0 .37.14.72.4.98l1.2 1.2c.25.26.6.4.98.4h1.9c.57 0 1.09.34 1.33.87l.91 2.19c.24.57.11 1.22-.31 1.64l-1.58 1.58a2.93 2.93 0 0 1-2.9.74 15.06 15.06 0 0 1-5.56-3.53 15.06 15.06 0 0 1-3.53-5.56 2.93 2.93 0 0 1 .74-2.9l1.59-1.45Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default PhoneIcon;
