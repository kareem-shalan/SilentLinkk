import React from 'react';
import NorthAfricaInteractiveMap from './NorthAfricaInteractiveMap';

// التعديل هنا: أضفنا country جوه الـ Props عشان يستقبل البلد الحقيقية من صفحة الداشبورد
function DashboardMapPanel({ pins, country }) {
	
	// لو مفيش country مبعوتة، بياخد البلد المسجلة أو الافتراضي maroc
	const activeCountry = country || localStorage.getItem('org_country') || 'maroc';

	return (
		<section className="relative min-h-[250px] overflow-hidden rounded-[var(--radius-sm)] bg-[#e7ecf4] sm:min-h-[320px] xl:min-h-[395px]">
			<div className="absolute inset-0">
				{/* تمرير البلد النشطة الممررة ديناميكياً للمكون التفاعلي */}
				<NorthAfricaInteractiveMap pins={pins} country={activeCountry} />
			</div>
		</section>
	);
}

export default DashboardMapPanel;