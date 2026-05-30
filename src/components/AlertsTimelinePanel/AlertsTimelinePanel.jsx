function AlertsTimelinePanel({ title, rows }) {
	return (
		<section className="overflow-hidden rounded-[var(--radius-sm)] border border-[#7f7f7f] bg-[var(--color-surface)]">
			<header className="bg-[#bccbb3] px-4 py-2">
				<h3 className="m-0 text-[length:var(--font-size-xl)] font-semibold text-[#202020] md:text-[length:var(--font-size-2xl)]">
					{title}
				</h3>
			</header>
			<div className="px-4 py-2">
				{rows.map((row) => (
					<div
						key={row.event}
						className="grid grid-cols-[20px_1fr] items-center gap-x-2 gap-y-1 border-t border-[#d5d5d5] py-3 first:border-t-0 sm:grid-cols-[24px_1fr_auto] sm:gap-x-0 sm:gap-y-0"
					>
						<span className="h-3.5 w-3.5 rounded-full bg-[var(--color-brand)]" />
						<span className="text-[length:var(--font-size-lg)] font-semibold text-[#1d1d1d] md:text-[length:var(--font-size-2xl)]">
							{row.event}
						</span>
						<span className="col-start-2 text-[length:var(--font-size-lg)] text-[#414141] md:text-[length:var(--font-size-2xl)] sm:col-start-auto">
							{row.time}
						</span>
					</div>
				))}
			</div>
		</section>
	);
}

export default AlertsTimelinePanel;
