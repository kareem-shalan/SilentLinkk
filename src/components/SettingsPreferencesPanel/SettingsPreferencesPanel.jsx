function SettingsPreferencesPanel({ sectionTitle, rows }) {
	return (
		<section className="overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-surface)]">
			<header className="bg-[var(--color-brand)] px-4 py-2">
				<h3 className="m-0 text-[length:var(--font-size-xl)] font-semibold text-[#101010]">{sectionTitle}</h3>
			</header>
			<div className="space-y-3 p-4 sm:p-6">
				{rows.map((row) => (
					<div key={row.label} className="grid items-center gap-3 sm:grid-cols-[180px_1fr]">
						<span className="text-[length:var(--font-size-xl)] font-semibold text-[#1f1f1f]">{row.label}</span>
						<div className="w-full max-w-[260px] rounded-[2px] bg-[var(--color-brand)] px-4 py-2 text-center text-[length:var(--font-size-md)] text-[#0d2a20]">
							{row.value}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default SettingsPreferencesPanel;
