function UserIcon({ className }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden="true"
		>
			<circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
			<path
				d="M4 19.5c1.8-3.2 5-4.5 8-4.5s6.2 1.3 8 4.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default UserIcon;
