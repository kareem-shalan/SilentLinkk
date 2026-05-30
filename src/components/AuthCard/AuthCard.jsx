function AuthCard({ leftSection, rightSection, invertOnDesktop = false }) {
	const desktopGridClass = invertOnDesktop ? 'md:grid-cols-[1.35fr_1fr]' : 'md:grid-cols-[1fr_1.25fr]';

	return (
		<article
			className={`mx-auto grid w-full max-w-[1280px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-frame)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] ${desktopGridClass}`}
		>
			<section className="min-h-[360px]">{leftSection}</section>
			<section className="min-h-[360px]">{rightSection}</section>
		</article>
	);
}

export default AuthCard;
