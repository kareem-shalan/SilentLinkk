import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import Button from '../components/Button';
import FormField from '../components/FormField';
import Logo from '../components/Logo';
import UserIcon from '../assets/icons/UserIcon';
import MailIcon from '../assets/icons/MailIcon';
import useContactPage from '../hooks/useContactPage';
import { BRAND, CONTACT_PAGE_CONTENT, ROUTES } from '../utils/constants';

const FORM_ICON_BY_FIELD_ID = {
	name: UserIcon,
	email: MailIcon,
};

const INITIAL_FORM_VALUES = CONTACT_PAGE_CONTENT.formFields.reduce((accumulator, field) => {
	accumulator[field.name] = '';
	return accumulator;
}, {});

function ContactPage() {
	const navigate = useNavigate();
	const { values, errors, isSubmitting, isSubmitted, handleChange, handleSubmit } =
		useContactPage(INITIAL_FORM_VALUES);

	function goToSignIn() {
		navigate(ROUTES.SIGN_IN);
	}

	return (
		<main className="min-h-screen px-5 py-8 md:px-8 md:py-12">
			<AuthCard
				invertOnDesktop
				leftSection={
					<section className="flex h-full flex-col p-8 md:p-12">
						<header>
							<Logo label={BRAND.name} tone="dark" />
						</header>
						<div className="my-auto flex flex-col gap-6">
							<h1 className="m-0 text-[length:var(--font-size-3xl)] font-bold text-[var(--color-brand)]">
								{CONTACT_PAGE_CONTENT.formTitle}
							</h1>
							<p className="m-0 text-[length:var(--font-size-md)] text-[var(--color-text-dark)]">
								{CONTACT_PAGE_CONTENT.formDescription}
							</p>
							<form onSubmit={handleSubmit} className="flex flex-col gap-4">
								{CONTACT_PAGE_CONTENT.formFields
									.filter((field) => field.type !== 'textarea')
									.map((field) => (
										<div key={field.id} className="space-y-1">
											<FormField
												label={field.label}
												name={field.name}
												value={values[field.name]}
												onChange={handleChange}
												placeholder={field.placeholder}
												type={field.type}
												Icon={FORM_ICON_BY_FIELD_ID[field.id]}
											/>
											{errors[field.name] ? (
												<p className="m-0 text-[length:var(--font-size-sm)] font-semibold text-red-600">
													{errors[field.name]}
												</p>
											) : null}
										</div>
									))}
								<div className="space-y-1">
									<label className="block">
										<span className="sr-only">Message</span>
										<textarea
											name="message"
											value={values.message}
											onChange={handleChange}
											placeholder="Message"
											rows={5}
											className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--color-border-soft)] bg-[var(--color-input-bg)] px-4 py-3 text-[length:var(--font-size-lg)] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
										/>
									</label>
									{errors.message ? (
										<p className="m-0 text-[length:var(--font-size-sm)] font-semibold text-red-600">
											{errors.message}
										</p>
									) : null}
								</div>
								{isSubmitted ? (
									<p className="m-0 text-[length:var(--font-size-sm)] font-semibold text-green-700">
										{CONTACT_PAGE_CONTENT.successMessage}
									</p>
								) : null}
								<div className="pt-4 text-center">
									<Button
										label={isSubmitting ? 'Sending...' : CONTACT_PAGE_CONTENT.submitLabel}
										type="submit"
									/>
								</div>
							</form>
						</div>
					</section>
				}
				rightSection={
					<section className="flex h-full flex-col justify-between bg-[var(--color-brand)] p-8 text-[var(--color-text-inverse)] md:p-12">
						<header>
							<Logo label={BRAND.name} tone="light" />
						</header>
						<div className="flex flex-col gap-6">
							<h2 className="m-0 text-[length:var(--font-size-display)] font-bold leading-tight">
								{CONTACT_PAGE_CONTENT.panelTitle}
							</h2>
							<p className="m-0 text-[length:var(--font-size-xl)] leading-relaxed">
								{CONTACT_PAGE_CONTENT.panelDescription}
							</p>
						</div>
						<div className="flex justify-end">
							<button
								type="button"
								onClick={goToSignIn}
								className="rounded-[var(--radius-pill)] border border-[var(--color-border-soft)] px-5 py-2 text-[length:var(--font-size-md)] font-semibold text-[var(--color-text-inverse)] transition hover:bg-white/10"
							>
								Back to Sign In
							</button>
						</div>
					</section>
				}
			/>
		</main>
	);
}

export default ContactPage;
