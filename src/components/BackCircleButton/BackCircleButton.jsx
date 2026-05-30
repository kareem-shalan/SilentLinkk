import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon';

function BackCircleButton({ onClick }) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label="Go back"
			className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-brand)] text-[var(--color-brand)] transition-colors hover:bg-[var(--color-brand)] hover:text-[var(--color-text-inverse)]"
		>
			<ChevronLeftIcon className="h-5 w-5" />
		</button>
	);
}

export default BackCircleButton;
