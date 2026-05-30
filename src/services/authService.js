export async function submitSignIn(payload) {
	const normalizedEmail = payload.email?.trim();
	const normalizedPassword = payload.password?.trim();

	await new Promise((resolve) => {
		setTimeout(resolve, 500);
	});

	if (normalizedEmail === 'admin@gmail.com' && normalizedPassword === 'admin') {
		return Promise.resolve({
			email: normalizedEmail,
			role: 'admin',
		});
	}

	throw new Error('Invalid admin credentials. Use admin / admin.');
}

export async function submitForgotPassword(payload) {
	return Promise.resolve(payload);
}

export async function verifyOtp(payload) {
	return Promise.resolve(payload);
}

export async function resendOtp(payload) {
	return Promise.resolve(payload);
}

export async function fetchDashboardData() {
	return Promise.resolve({
		stats: [
			{ title: 'Total SOS', value: 50, subtitle: 'On this day' },
			{ title: 'Ended SOS', value: 30, subtitle: 'On this day' },
			{ title: 'Running SOS', value: 15, subtitle: 'On this day' },
			{ title: 'Pending SOS', value: 5, subtitle: 'On this day' },
		],
		menuItems: ['Dashboard', 'SOS management', 'Map management'],
		historyRows: [
			{ name: 'Malak Khaled', status: 'Pending', EmergencyType: 'Medical'},
			{ name: 'Amira Ahmed', status: 'Resolved', EmergencyType: 'Fire'},
			{ name: 'Nour Youssef', status: 'Resolved', EmergencyType: 'Accident'},
			{ name: 'Reem Mostafa', status: 'Pending', EmergencyType: 'Natural Disaster'},
			{ name: 'Jana Hamed', status: 'Resolved', EmergencyType: 'Military Attack'},
		],
		mapPins: [
			{ positionClass: 'left-[12%] top-[38%]', tone: 'yellow' },
			{ positionClass: 'left-[18%] top-[64%]', tone: 'red' },
			{ positionClass: 'left-[36%] top-[15%]', tone: 'red' },
			{ positionClass: 'left-[55%] top-[32%]', tone: 'red' },
			{ positionClass: 'left-[51%] top-[42%]', tone: 'yellow' },
			{ positionClass: 'left-[61%] top-[38%]', tone: 'green' },
			{ positionClass: 'left-[66%] top-[59%]', tone: 'green' },
			{ positionClass: 'left-[72%] top-[37%]', tone: 'red' },
			{ positionClass: 'left-[80%] top-[34%]', tone: 'yellow' },
			{ positionClass: 'left-[80%] top-[84%]', tone: 'green' },
			{ positionClass: 'left-[49%] top-[59%]', tone: 'red' },
		],
	});
}

export async function fetchSosManagementData() {
	return Promise.resolve({
		menuItems: ['Dashboard', 'SOS management', 'Map Management'],
		statusSummary: [
			{
				label: 'Pending Alerts',
				value: 12,
				cardClass: 'bg-[#e3b8b8]',
				dotClass: 'bg-[#d84d4d]',
			},
			{
				label: 'Resolved',
				value: 40,
				cardClass: 'bg-[#d6e5d8]',
				dotClass: 'bg-[#3ea867]',
			},
		],
		alertRows: [
			{
				alertId: 'A-11',
				user: 'Malak khaled',
				emergencyType: 'Fire',
				location: 'Cairo',
				time: '10m ago',
				status: '⚠️ Pending',
				statusClass: 'bg-[#d59b9b] text-[#5a1111]',
			},
			{
				alertId: 'A-12',
				user: 'Amir Eid',
				emergencyType: 'Medical',
				location: 'Giza',
				time: '11m ago',
				status: '⚠️ Resolved',
				statusClass: 'bg-[#4AAA6B] text-[#0f4c26]',
			},
			{
				alertId: 'A-13',
				user: 'Youssef Ahmed',
				emergencyType: 'Accident',
				location: 'Cairo',
				time: '15m ago',
				status: '⚠️ Pending',
				statusClass: 'bg-[#d59b9b] text-[#5a1111]',
			},
			{
				alertId: 'A-14',
				user: 'Hana Hassan',
				emergencyType: 'Natural Disaster',
				location: 'Cairo',
				time: '5m ago',
				status: '⚠️ Pending',
				statusClass: 'bg-[#d59b9b] text-[#5a1111]',
			},
			{
				alertId: 'A-15',
				user: 'Malak Ahmed',
				emergencyType: 'Military Attack',
				location: 'Giza',
				time: '2m ago',
				status: '⚠️ Resolved',
				statusClass: 'bg-[#4AAA6B] text-[#0f4c26]',
			},
			{
				alertId: 'A-16',
				user: 'Khaled Mohamed',
				emergencyType: 'Accident',
				location: 'Alex',
				time: '10m ago',
				status: '⚠️ Pending',
				statusClass: 'bg-[#d59b9b] text-[#5a1111]',
			},
			{
				alertId: 'A-17',
				user: 'Nour Walid',
				emergencyType: 'Infrastructure Failure',
				location: 'Alex',
				time: '10m ago',
				status: '⚠️ Resolved',
				statusClass: 'bg-[#4AAA6B] text-[#0f4c26]',
			},
			{
				alertId: 'A-18',
				user: 'Mohamed Ahmed',
				emergencyType: 'Military Attack',
				location: 'Cairo',
				time: '7m ago',
				status: '⚠️ Pending',
				statusClass: 'bg-[#d59b9b] text-[#5a1111]',
			},
			{
				alertId: 'A-19',
				user: 'Heba Ahmed',
				emergencyType: 'Medical',
				location: 'Giza',
				time: '3m ago',
				status: '⚠️ Pending',
				statusClass: 'bg-[#d59b9b] text-[#5a1111]',
			},
			{
				alertId: 'A-20',
				user: 'Hager Hassan',
				emergencyType: 'Natural Disaster',
				location: 'Giza',
				time: '16m ago',
				status: '⚠️ Pending',
				statusClass: 'bg-[#d59b9b] text-[#5a1111]',
			},
			{
				alertId: 'A-21',
				user: 'Mahmoud Ali',
				emergencyType: 'Infrastructure Failure',
				location: 'Alex',
				time: '4m ago',
				status: '⚠️ Resolved',
				statusClass: 'bg-[#4AAA6B] text-[#0f4c26]',
			},
		],
		alertDetails: {
			alertId: 'A-11',
			status: ' ⚠️ Pending',
			statusClass: 'bg-[#d59b9b] text-[#5a1111]',
			userLabel: 'User info',
			userName: 'Malak Khaled',
			phone: '+20 112 432 4573',
		},
	});
}

export async function fetchAlertsData() {
	return Promise.resolve({
		menuItems: ['Dashboard', 'SOS management', 'Map management'],
		mapPins: [
			{ positionClass: 'left-[18%] top-[38%]', tone: 'red' },
			{ positionClass: 'left-[16%] top-[58%]', tone: 'green' },
			{ positionClass: 'left-[36%] top-[14%]', tone: 'red' },
			{ positionClass: 'left-[56%] top-[33%]', tone: 'red' },
			{ positionClass: 'left-[52%] top-[41%]', tone: 'green' },
			{ positionClass: 'left-[63%] top-[37%]', tone: 'red' },
			{ positionClass: 'left-[69%] top-[53%]', tone: 'green' },
			{ positionClass: 'left-[74%] top-[37%]', tone: 'red' },
			{ positionClass: 'left-[82%] top-[33%]', tone: 'red' },
			{ positionClass: 'left-[82%] top-[76%]', tone: 'red' },
			{ positionClass: 'left-[58%] top-[64%]', tone: 'green' },
		],
		userInfoRows: [
			{ label: 'Name', value: 'Amir Eid' },
			{ label: 'Phone', value: '+20 123 456 7890' },
			{ label: 'Location', value: 'Giza' },
			{ label: 'Emergency Type', value: 'Medical' },
		],
		timelineRows: [
			{ event: 'Alert recieved', time: '11mins ago' },
			{ event: 'Admin viewed', time: '10mins ago' },
			{ event: 'Help dispatched', time: '7mins ago' },
			{ event: 'Resolved', time: '3mins ago' },
		],
	});
}

export async function fetchSettingsData() {
	return Promise.resolve({
		menuItems: ['Dashboard', 'SOS management', 'Map management'],
		preferences: [
			{
				label: 'Time Format',
				value: 'Every month',
			},
		],
	});
}
