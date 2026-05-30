import React from 'react';

import DashboardIcon from '../../assets/dashboard-icon.svg';
import SOSIcon from '../../assets/sos-icon.svg';
import MapIcon from '../../assets/map-icon.svg';
import SettingsIcon from '../../assets/setting-icon.svg';
import LogoutIcon from '../../assets/logout-icon.svg';

import libyaLogo from '../../assets/icons/libya-logo.png';
import moroccoLogo from '../../assets/icons/morocco-logo.png';
import tunisiaLogo from '../../assets/icons/tunisia-logo.webp';
import algeriaLogo from '../../assets/icons/algeria-logo.png';
import egyptLogo from '../../assets/red-crescent.svg';

const ORGANIZATION_CONFIGS = {
	libya: {
		countryName: 'ليبيا',
		logo: libyaLogo,
	},
	maroc: {
		countryName: 'المغرب',
		logo: moroccoLogo,
	},
	tunisia: {
		countryName: 'تونس',
		logo: tunisiaLogo,
	},
	algeria: {
		countryName: 'الجزائر',
		logo: algeriaLogo,
	},
	egypt: {
		countryName: 'مصر',
		logo: egyptLogo,
	},
};

const SIDEBAR_FOOTER_ITEMS = ['Settings', 'Logout'];

function DashboardSidebar({
	menuItems,
	activeMenuIndex = 0,
	onSelectMenuItem,
	activeFooterItem,
	onSelectFooterItem,
}) {
	const orgCountry =
		localStorage.getItem('org_country')?.toLowerCase()?.trim() || 'maroc';

	const countryAliases = {
		maroc: 'maroc',
		morocco: 'maroc',

		tunisia: 'tunisia',
		tunis: 'tunisia',

		libya: 'libya',

		algeria: 'algeria',
		algerie: 'algeria',
		alger: 'algeria',
		'algérie': 'algeria',

		egypt: 'egypt',
		egypte: 'egypt',
		misr: 'egypt',
	};

	const normalizedCountry =
		countryAliases[orgCountry] || 'maroc';

	const currentOrg =
		ORGANIZATION_CONFIGS[normalizedCountry];

	return (
		<aside className="flex h-full min-h-0 flex-col justify-between rounded-[var(--radius-sm)] border border-[#9f9f9f] bg-[#ececec] p-3 sm:p-4 xl:min-h-[875px]">
			<div className="space-y-4">
				<div className="rounded-[var(--radius-sm)] border border-[#adadad] bg-[var(--color-surface)] px-4 py-3 text-center">
					<img
						src={currentOrg.logo}
						alt={currentOrg.countryName}
						className="w-[120px] h-[120px] object-contain mx-auto"
					/>
				</div>

				<nav className="space-y-2">
					{menuItems?.map((item, index) => (
						<button
							key={item}
							type="button"
							onClick={() => onSelectMenuItem?.(index)}
							className={`flex items-center gap-3 rounded-[var(--radius-sm)] px-4 py-3 text-[length:var(--font-size-lg)] font-semibold md:text-[length:var(--font-size-xl)] ${
								index === activeMenuIndex
									? 'border border-[#b7b7b7] bg-[#dedede] text-[var(--color-text-dark)]'
									: 'text-[#3b3b3b] opacity-90 hover:bg-[#e4e4e4]'
							}`}
						>
							<img
								src={
									item === 'Dashboard'
										? DashboardIcon
										: item === 'SOS management'
										? SOSIcon
										: MapIcon
								}
								className={`w-5 h-5 shrink-0 transition-all duration-300 ${
									index === activeMenuIndex
										? 'opacity-100 grayscale-0'
										: 'opacity-30 grayscale'
								}`}
								alt="icon"
							/>

							<span className="whitespace-nowrap px-3 text-sm font-bold">
								{item === 'Alerts'
									? 'Map management'
									: item}
							</span>
						</button>
					))}
				</nav>
			</div>

			<div className="space-y-3 px-3 pb-2 text-[length:var(--font-size-xl)] font-semibold text-[#161616] md:space-y-4 md:pb-3 md:text-[length:var(--font-size-2xl)]">
				{SIDEBAR_FOOTER_ITEMS.map((item) => (
					<button
						key={item}
						type="button"
						onClick={() =>
							onSelectFooterItem?.(
								item.toLowerCase()
							)
						}
						className={`flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-2 py-2 text-left transition-all ${
							activeFooterItem ===
							item.toLowerCase()
								? 'bg-[#dedede]'
								: 'hover:bg-[#e4e4e4]'
						}`}
					>
						<img
							src={
								item === 'Settings'
									? SettingsIcon
									: LogoutIcon
							}
							className="w-5 h-5 shrink-0"
							alt={item}
						/>

						<span className="text-sm font-bold text-[#161616]">
							{item}
						</span>
					</button>
				))}
			</div>
		</aside>
	);
}

export default DashboardSidebar;