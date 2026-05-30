function TextButton({ label, onClick, className = '' }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`border-none bg-transparent p-0 text-[length:var(--font-size-xl)] font-semibold text-[var(--color-text-dark)] transition-colors hover:text-[var(--color-brand)] ${className}`}
		>
			{label}
		</button>
	);
}

export default TextButton;
