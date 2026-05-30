import LogoIcon from '../../assets/icons/LogoIcon';

function Logo({ label, tone = 'light' }) {
	const toneClassByName = {
		light: 'text-[var(--color-text-inverse)]',
		dark: 'text-[var(--color-brand)]',
	};

	return (
		<div className={`inline-flex items-center gap-2 ${toneClassByName[tone]}`}>
			<LogoIcon className="h-7 w-7" />
			<span className="text-[length:var(--font-size-xl)] font-semibold tracking-wide">{label}</span>
		</div>
	);
}

export default Logo;
