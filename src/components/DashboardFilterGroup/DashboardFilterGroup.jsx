function DashboardFilterGroup({ options, activeValue, onChange }) {
	return (
		<div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-1 md:gap-12">
			{options.map((option) => {
				const isActive = activeValue === option;

				return (
					<button
						key={option}
						type="button"
						onClick={() => onChange(option)}
						className="flex items-center gap-2 text-[length:var(--font-size-xl)] font-semibold capitalize text-[#181818] md:text-[length:var(--font-size-2xl)]"
					>
						<span
							className={`h-4 w-4 rounded-full border border-[var(--color-brand)] ${
								isActive ? 'bg-[var(--color-brand)]' : 'bg-transparent'
							}`}
						/>
						<span>{option}</span>
					</button>
				);
			})}
		</div>
	);
}

export default DashboardFilterGroup;
