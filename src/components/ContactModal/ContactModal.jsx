import { useEffect, useRef } from 'react';
import MailIcon from '../../assets/icons/MailIcon';
import PhoneIcon from '../../assets/icons/PhoneIcon';
import { CONTACT_MODAL_CONTENT } from '../../utils/constants';
import ContactIcon from '../../assets/icons/icon-contactus.svg'; 

function ContactModal({ isOpen, onClose }) {
	const modalRef = useRef(null);

	useEffect(() => {
		if (isOpen) document.body.style.overflow = 'hidden';
		return () => document.body.style.overflow = '';
	}, [isOpen]);

	if (!isOpen) return null;

	const { title, contactLabel, defaultEmail, defaultPhone } = CONTACT_MODAL_CONTENT;

	return (
		<div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
			
			<div className="fixed inset-0 bg-black/50" onClick={onClose} />

			{/* rounded-none عشان المربع يبقى حاد تماماً من غير أي كيرف */}
			<div 
				ref={modalRef}
				className="relative w-full max-w-md rounded-none border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-8 shadow-2xl z-10"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center gap-3">
					
					{/* الأيقونة بمقاس 45x45 وبتشتغل كزرار قفل لما تدوسي عليها */}
					<button 
						onClick={onClose} 
						className="p-0 border-none bg-transparent cursor-pointer shrink-0"
						aria-label="Close"
					>
						<img 
							src={ContactIcon} 
							alt="Close" 
							style={{ width: '45px', height: '45px' }} 
							className="object-contain" 
						/>
					</button>
					
					<h2 className="m-0 flex-1 text-[length:var(--font-size-xl)] font-bold text-[var(--color-brand)]">
						{title}
					</h2>
				</div>

				<p className="m-0 mt-6 text-[length:var(--font-size-sm)] font-semibold text-[var(--color-text-dark)]">
					{contactLabel}
				</p>

				<div className="mt-3 space-y-3">
					{/* rounded-none هنا كمان عشان الصناديق تكون حادة */}
					<div className="flex h-14 items-center gap-3 rounded-none border border-[var(--color-border-soft)] bg-[var(--color-input-bg)] px-4">
						<MailIcon className="h-5 w-5 shrink-0 text-[var(--color-text-muted)]" />
						<span className="text-[length:var(--font-size-lg)] text-[var(--color-text-primary)]">
							{defaultEmail}
						</span>
					</div>
					<div className="flex h-14 items-center gap-3 rounded-none border border-[var(--color-border-soft)] bg-[var(--color-input-bg)] px-4">
						<PhoneIcon className="h-5 w-5 shrink-0 text-[var(--color-text-muted)]" />
						<span className="text-[length:var(--font-size-lg)] text-[var(--color-text-primary)]">
							{defaultPhone}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactModal;