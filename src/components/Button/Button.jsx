function Button({ label, variant = 'solid', type = 'button', onClick, className = '' }) {
	const variantClassByName = {
		solid:
			'bg-[var(--color-brand)] text-[var(--color-text-inverse)] hover:bg-[var(--color-brand-strong)]',
		outline:
			'border border-[var(--color-border-soft)] text-[var(--color-text-inverse)] hover:bg-white/10',
	};

	return (
		<button
			type={type}
			onClick={onClick}
			className={`h-12 min-w-48 rounded-[var(--radius-pill)] px-8 text-[length:var(--font-size-xl)] font-semibold uppercase tracking-wide transition-colors ${variantClassByName[variant]} ${className}`}
		>
			{label}
		</button>
	);
}

export default Button;
