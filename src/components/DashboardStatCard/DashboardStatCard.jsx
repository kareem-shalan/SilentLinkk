function DashboardStatCard({ title, value, subtitle, active = false }) {
	return (
		<article
			className={`flex min-w-0 flex-1 flex-col items-center rounded-[var(--radius-sm)] bg-[var(--color-brand)] px-3 py-2 text-[var(--color-text-inverse)] xl:min-w-[230px] ${
				active ? 'ring-2 ring-[#3f90df]' : ''
			}`}
		>
			<h3 className="m-0 text-[length:var(--font-size-2xl)] font-bold xl:text-[length:2.2rem]">{title}</h3>
			<p className="m-0 text-[length:3.2rem] leading-none font-bold xl:text-[length:4rem]">{value}</p>
			<p className="m-0 text-[length:var(--font-size-sm)] font-semibold">{subtitle}</p>
		</article>
	);
}

export default DashboardStatCard;
