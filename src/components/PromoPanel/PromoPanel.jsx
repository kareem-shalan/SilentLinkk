import Button from '../Button';
import LogoShield from '../../assets/logo-shield.svg';

function PromoPanel({
	className,
	showLogo = false,
	brandName,
	title,
	description,
	actionLabel,
	onAction,
	align = 'left',
}) {
	const alignmentClassByName = {
		left: 'items-center text-center',
		center: 'items-center text-center',
	};

	return (
		<div className={'flex h-full flex-col justify-start pt-10 ${className} bg-[var(--color-brand)] p-8 text-[var(--color-text-inverse)] md:p-12 relative'}>
			<header className="flex justify-center w-full mb-6"> <img src={LogoShield} alt="Logo" className="w-[100px] h-auto"></img></header>
			<div className={`flex max-w-[600px] flex-col gap-6 ${alignmentClassByName[align]} `}>
				<h2 className="-mt-10 pl-5 whitespace-nowrap bg text-[length:var(--font-size-display)] font-bold leading-tight">{title}</h2>
				<p className="-mt-2 bg text-[length:var(--font-size-xl)] leading-relaxed">{description}</p>
				<Button className='absolute bottom-[30px] right-[25px] bg-transparent text-gray-600 border border-gray-600 rounded-full px-4 py-1.5 text-[10px] h-auto !normalcase' label={<span className="normal-case">Contact Us</span>} onClick={onAction} />
			</div>
		</div>
	);
}

export default PromoPanel;
