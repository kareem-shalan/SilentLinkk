export const ROUTES = {
	ROOT: '/',
	SIGN_IN: '/sign-in',
	CONTACT: '/contact',
	DASHBOARD: '/dashboard',
	SOS_MANAGEMENT: '/sos-management',
	ALERTS: '/alerts',
	SETTINGS: '/settings',
};

export const BRAND = {
	name: 'Silent link',
};

export const SIGN_IN_CONTENT = {
	formTitle: 'Sign in to Silent link',
	submitLabel: 'Sign In',
	forgotPasswordLabel: '',
	panelTitle: 'Hello..',
	panelDescription: 'Enter your personal details',
	panelActionLabel: 'Contact Us',
};

export const CONTACT_MODAL_CONTENT = {
	title: 'Get in Touch With Us',
	contactLabel: 'Contact',
	defaultEmail: 'silentlink@gmail.com',
	defaultPhone: '+20 123 456 7890',
};

export const CONTACT_PAGE_CONTENT = {
	pageTitle: 'Contact Us',
	formTitle: 'Get in Touch With Us',
	formDescription: 'Leave your details and message, and our team will contact you soon.',
	submitLabel: 'Submit',
	successMessage: 'Message sent successfully.',
	panelTitle: 'We are here to help',
	panelDescription: 'Support for safety operations across North Africa.',
	formFields: [
		{
			id: 'name',
			label: 'Name',
			name: 'name',
			type: 'text',
			placeholder: 'Name',
		},
		{
			id: 'email',
			label: 'Email',
			name: 'email',
			type: 'email',
			placeholder: 'Email',
		},
		{
			id: 'message',
			label: 'Message',
			name: 'message',
			type: 'textarea',
			placeholder: 'Message',
		},
	],
};

export const DASHBOARD_CONTENT = {
	title: 'Dashbored daily',
	filterOptions: ['daily', 'weekly', 'monthly'],
	searchPlaceholder: 'Search',
	historyTitle: 'SOS History',
	historyRangeLeft: 'Last week',
	historyRangeRight: 'This month',
	legendItems: ['Affected areas', 'Safe places', 'Help reached here'],
	sidebarFooter: ['Settings', 'Logout'],
};

export const SOS_MANAGEMENT_CONTENT = {
	title: 'SOS Management',
	columns: ['Alert ID', 'User', 'Emergency type', 'Location', 'Time', 'Status'],
	detailTitle: 'Alert Details',
};

export const ALERTS_CONTENT = {
	title: 'Alerts',
	userInfoTitle: 'User Info',
	timelineTitle: 'Timeline',
	actionButtons: ['Send Warning', 'Alert Received', 'Help on the way', 'Alert Resolved'],
};

export const SETTINGS_CONTENT = {
	title: 'Settings',
	tabLabel: 'General',
	sectionTitle: 'System Preferences',
	fieldLabel: 'Time Format',
	fieldValue: 'Every month',
};
