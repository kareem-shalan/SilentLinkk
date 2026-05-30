import { useState } from 'react';

function useContactPage(initialValues) {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	function handleChange(event) {
		const { name, value } = event.target;
		setValues((previousValues) => ({
			...previousValues,
			[name]: value,
		}));

		setErrors((previousErrors) => ({
			...previousErrors,
			[name]: '',
		}));
		setIsSubmitted(false);
	}

	function validateForm() {
		const nextErrors = {};
		const trimmedName = values.name.trim();
		const trimmedEmail = values.email.trim();
		const trimmedMessage = values.message.trim();

		if (!trimmedName) {
			nextErrors.name = 'Name is required.';
		}

		if (!trimmedEmail) {
			nextErrors.email = 'Email is required.';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
			nextErrors.email = 'Enter a valid email.';
		}

		if (!trimmedMessage) {
			nextErrors.message = 'Message is required.';
		}

		return nextErrors;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const nextErrors = validateForm();
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			setIsSubmitted(false);
			return false;
		}

		setIsSubmitting(true);
		await new Promise((resolve) => {
			setTimeout(resolve, 500);
		});
		setIsSubmitting(false);
		setIsSubmitted(true);
		return true;
	}

	return {
		values,
		errors,
		isSubmitting,
		isSubmitted,
		handleChange,
		handleSubmit,
	};
}

export default useContactPage;
