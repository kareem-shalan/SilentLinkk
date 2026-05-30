function AlertsActionBar({ labels }) {
	return (
		<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
			{labels.map((label) => (
				<button
					key={label}
					type="button"
					className="rounded-[var(--radius-sm)] border border-[#6f7f67] bg-[#bccbb3] px-4 py-3 text-[length:var(--font-size-lg)] font-semibold text-[#1e1e1e] md:text-[length:var(--font-size-2xl)]"
				>
					{label}
				</button>
			))}
		</div>
	);
}

export default AlertsActionBar;
