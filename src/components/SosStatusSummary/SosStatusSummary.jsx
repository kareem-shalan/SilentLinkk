function SosStatusSummary({ items }) {
	return (
		<div className="flex flex-wrap items-center gap-3">
			{items.map((item) => (
				<article
					key={item.label}
					className={`flex min-w-[120px] items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 ${item.cardClass}`}
				>
					<span className={`h-4 w-4 rounded-full ${item.dotClass}`} />
					<div className="leading-none">
						<p className="m-0 text-[length:var(--font-size-sm)] text-[#4a4a4a]">{item.label}</p>
						<p className="m-0 text-[length:var(--font-size-lg)] font-bold text-[#242424]">{item.value}</p>
					</div>
				</article>
			))}
		</div>
	);
}

export default SosStatusSummary;
