import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardChartPanel from '../components/DashboardChartPanel/DashboardChartPanel';
import DashboardFilterGroup from '../components/DashboardFilterGroup/DashboardFilterGroup';
import DashboardMapLegend from '../components/DashboardMapLegend/DashboardMapLegend';
import DashboardMapPanel from '../components/DashboardMapPanel/DashboardMapPanel';
import DashboardPiePanel from '../components/DashboardPiePanel/DashboardPiePanel';
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar';
import DashboardStatCard from '../components/DashboardStatCard/DashboardStatCard';
import SosHistoryPanel from '../components/SosHistoryPanel/SosHistoryPanel';
import OrganizationLayout from '../components/OrganizationLayout';
import useDashboardData from '../hooks/useDashboardData';
import { useDashboardApi } from '../hooks/useDashboardApi';
import { DASHBOARD_CONTENT, ROUTES } from '../utils/constants';

function DashboardPage() {
	const navigate = useNavigate();
	const { activeFilter, setActiveFilter, dashboardData } = useDashboardData();
	
	// قراءة البيانات والـ Pins الحية من الـ API Hook
	const { stats, chartData, history, mapPins, isLoading, error } = useDashboardApi(activeFilter);

	function handleSidebarSelect(index) {
		if (index === 0) navigate(ROUTES.DASHBOARD);
		if (index === 1) navigate(ROUTES.SOS_MANAGEMENT);
		if (index === 2) navigate(ROUTES.ALERTS);
	}

	function handleFooterSelect(item) {
		if (item === 'settings') navigate(ROUTES.SETTINGS);
		if (item === 'logout') navigate(ROUTES.SIGN_IN);
	}

	// تجميع الـ Pins القادمة من الـ API لعرضها على الخريطة
	const currentLivePins = [
		...(mapPins.Help || []),
		...(mapPins.Safe || []),
		...(mapPins.Affected || [])
	];

	// 🎯 التعديل الصح: قراءة اسم البلد ديناميكياً لتطير الخريطة على أي بلد تسجلي بيها
	const currentCountry = localStorage.getItem('org_country') || 'egypt';

	return (
        <OrganizationLayout
            sidebar={
                <DashboardSidebar
                    menuItems={dashboardData.menuItems}
                    activeMenuIndex={0}
                    activeFooterItem=""
                    logoUrl="https://upload.wikimedia.org/wikipedia/commons/e/e3/Egyptian_Red_Crescent_Logo.png"
                    logo="https://upload.wikimedia.org/wikipedia/commons/e/e3/Egyptian_Red_Crescent_Logo.png"
                    onSelectMenuItem={handleSidebarSelect}
                    onSelectFooterItem={handleFooterSelect}
                />
            }
        >
            <div className="flex min-h-[85vh] flex-col rounded-lg border border-[#777777] bg-white">
                <div className="mt-2 border-b border-[#777777] px-4 py-3 sm:px-8 sm:py-4">
                    <h1 className="m-0 text-lg font-bold text-black sm:text-2xl">
                        {activeFilter === 'daily' ? 'Dashboard Daily' : activeFilter === 'weekly' ? 'Dashboard Weekly' : 'Dashboard Monthly'}
                    </h1>
                </div>

                <div className="flex flex-col gap-5 p-4 sm:p-6 lg:p-8">
                    <DashboardFilterGroup
                        options={DASHBOARD_CONTENT.filterOptions}
                        activeValue={activeFilter}
                        onChange={setActiveFilter}
                    />

                    {error ? (
                        <div className="py-5 text-center text-sm font-bold text-[#8a1f1f]">
                            {error}
                        </div>
                    ) : null}

                    {isLoading ? (
                        <div className="py-12 text-center text-base font-bold text-[#49987A] sm:py-16 sm:text-lg">
                            جاري سحب البيانات الحية وتوزيع الخرائط...
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {stats.map((stat, index) => (
                                    <DashboardStatCard
                                        key={stat.title}
                                        title={stat.title}
                                        value={stat.value}
                                        subtitle={stat.subtitle}
                                        active={index === 0}
                                    />
                                ))}
                            </div>

                            <div className="grid min-w-0 gap-4 xl:grid-cols-[1fr_370px]">
                                <div className="min-w-0 space-y-4">
                                    <DashboardMapPanel pins={currentLivePins} country={currentCountry} />

                                    <div className="grid gap-4 lg:grid-cols-[230px_1fr]">
                                        <DashboardMapLegend items={DASHBOARD_CONTENT.legendItems} />
                                        <SosHistoryPanel
                                            historyRows={history}
                                            title={activeFilter === 'daily' ? 'This day' : activeFilter === 'weekly' ? 'This week' : 'This month'}
                                        />
                                    </div>
                                </div>
                                <div className="min-w-0 space-y-4">
                                    <DashboardChartPanel data={chartData} />
                                    <DashboardPiePanel chartData={stats} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </OrganizationLayout>
	);
}

export default DashboardPage;