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
import useDashboardData from '../hooks/useDashboardData';
import { useDashboardApi } from '../hooks/useDashboardApi';
import { DASHBOARD_CONTENT, ROUTES } from '../utils/constants';

function DashboardPage() {
	const navigate = useNavigate();
	const { activeFilter, setActiveFilter, dashboardData } = useDashboardData();
	
	// قراءة البيانات والـ Pins الحية من الـ API Hook
	const { stats, history, mapPins, isLoading } = useDashboardApi(activeFilter);

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
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4', fontFamily: 'Arial, sans-serif' }}>
            {/* السايد بار بمقاسه الثابت الموحد */}
            <div style={{ width: '300px', height: '100vh', position: 'fixed' }}>
                <DashboardSidebar
                    menuItems={dashboardData.menuItems}
                    activeMenuIndex={0}
                    activeFooterItem=""
                    // لوجو الهلال الأحمر المصري
                    logoUrl="https://upload.wikimedia.org/wikipedia/commons/e/e3/Egyptian_Red_Crescent_Logo.png"
                    logo="https://upload.wikimedia.org/wikipedia/commons/e/e3/Egyptian_Red_Crescent_Logo.png"
                    onSelectMenuItem={handleSidebarSelect}
                    onSelectFooterItem={handleFooterSelect}
                />
            </div>

            {/* المحتوى بالمقاسات والـ Layout المتطابق مع السيتينج */}
            <div style={{ flexGrow: 1, marginLeft: '320px', padding: '40px' }}>
                <div style={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #777777', 
                    borderRadius: '8px', 
                    minHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    
                    <div style={{ 
                        padding: '15px 30px', 
                        borderBottom: '1px solid #777777',
                        marginTop: '10px'
                    }}>
                        <h1 style={{ fontSize: '24px', margin: 0, color: '#000', fontWeight: 'bold' }}>
                            {activeFilter === 'daily' ? 'Dashboard Daily' : activeFilter === 'weekly' ? 'Dashboard Weekly' : 'Dashboard Monthly'}
                        </h1>
                    </div>

                    <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        {/* مجموعة الفلاتر لتبديل العرض الحقيقي */}
                        <DashboardFilterGroup
                            options={DASHBOARD_CONTENT.filterOptions}
                            activeValue={activeFilter}
                            onChange={setActiveFilter}
                        />

                        {isLoading ? (
                            <div style={{ textAlign: 'center', padding: '60px', color: '#49987A', fontWeight: 'bold', fontSize: '18px' }}>
                                جاري سحب البيانات الحية وتوزيع الخرائط...
                            </div>
                        ) : (
                            <>
                                {/* كروت الإحصائيات المربوطة بالسيرفر */}
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

                                <div className="grid gap-4 xl:grid-cols-[1fr_370px]">
                                    <div className="space-y-4">
                                        {/* الخريطة الذكية التي تعمل زووم ديناميكي حسب البلد */}
                                        <DashboardMapPanel pins={currentLivePins} country={currentCountry} />
                                        
                                        <div className="grid gap-4 lg:grid-cols-[230px_1fr]">
                                            <DashboardMapLegend items={DASHBOARD_CONTENT.legendItems} />
                                            {/* الجدول يعرض مصفوفة البلاغات الحقيقية القادمة من السيرفر */}
                                            <SosHistoryPanel 
                                                historyRows={history}
                                                title={activeFilter === 'daily' ? 'This day' : activeFilter === 'weekly' ? 'This week' : 'This month'} 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <DashboardChartPanel />
                                        <DashboardPiePanel />
                                    </div>
                                </div>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </div>
	);
}

export default DashboardPage;