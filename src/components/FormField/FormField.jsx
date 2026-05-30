function FormField({ label, name, value, onChange, placeholder, type, Icon }) {
	return (
		<label className="block">
			<span className="sr-only">{label}</span>
			<div className="flex h-14 items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-soft)] bg-[var(--color-input-bg)] px-4">
				{Icon ? <Icon className="h-5 w-5 text-[var(--color-text-muted)]" /> : null}
				<input
					name={name}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="w-full border-none bg-transparent text-[length:var(--font-size-lg)] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
				/>
			</div>
		</label>
	);
}

export default FormField;
