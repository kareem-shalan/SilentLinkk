function AlertsInfoPanel({ title, rows }) {
	return (
		<section className="overflow-hidden rounded-[var(--radius-sm)] border border-[#7f7f7f] bg-[var(--color-surface)]">
			<header className="bg-[#bccbb3] px-4 py-2">
				<h3 className="m-0 text-[length:var(--font-size-xl)] font-semibold text-[#202020] md:text-[length:var(--font-size-2xl)]">
					{title}
				</h3>
			</header>
			<div>
				{rows.map((row) => (
					<div key={row.label} className="grid grid-cols-[110px_1fr] border-t border-[#d5d5d5] px-3 py-3 sm:grid-cols-[140px_1fr] sm:px-4">
						<span className="text-[length:var(--font-size-lg)] font-semibold text-[#1d1d1d] md:text-[length:var(--font-size-xl)]">
							{row.label}
						</span>
						<span className="text-[length:var(--font-size-lg)] text-[#2f2f2f] md:text-[length:var(--font-size-xl)]">
							{row.value}
						</span>
					</div>
				))}
			</div>
		</section>
	);
}

export default AlertsInfoPanel;
