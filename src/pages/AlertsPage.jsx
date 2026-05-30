import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlertsMapPanel from '../components/AlertsMapPanel';
import DashboardSidebar from '../components/DashboardSidebar';
import useAlertsData from '../hooks/useAlertsData';
import { ROUTES } from '../utils/constants';

function AlertsPage() {
    const navigate = useNavigate();
    const { alertsData } = useAlertsData();

    function handleSidebarSelect(index) {
        if (index === 0) {
            navigate(ROUTES.DASHBOARD);
            return;
        }
        if (index === 1) {
            navigate(ROUTES.SOS_MANAGEMENT);
            return;
        }
        if (index === 2) {
            navigate(ROUTES.ALERTS);
        }
    }

    function handleFooterSelect(item) {
        if (item === 'settings') {
            navigate(ROUTES.SETTINGS);
            return;
        }
        if (item === 'logout') {
            navigate(ROUTES.SIGN_IN);
        }
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4', fontFamily: 'Arial, sans-serif' }}>
            {/* السايد بار بعرض ثابت مطابق لصفحة السيتينج */}
            <div style={{ width: '300px', height: '100vh', position: 'fixed' }}>
                <DashboardSidebar
                    menuItems={alertsData.menuItems}
                    activeMenuIndex={2} // الـ Map Management هي النشطة هنا
                    activeFooterItem=""
                    onSelectMenuItem={handleSidebarSelect}
                    onSelectFooterItem={handleFooterSelect}
                />
            </div>

            {/* المحتوى مع نفس المسافة الإزاحة والبيدنج */}
            <div style={{ flexGrow: 1, marginLeft: '320px', padding: '40px' }}>
                {/* المربع الأبيض الكبير الداخلي بنفس الحدود والارتفاع */}
                <div style={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #777777', 
                    borderRadius: '8px', 
                    minHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column' // عشان الخريطة تاخد باقي الارتفاع المتاح بالأسفل
                }}>
                    
                    {/* Map management Title Container بنفس أبعاد عنوان السيتينج */}
                    <div style={{ 
                        padding: '15px 30px', 
                        borderBottom: '1px solid #777777',
                        marginTop: '10px'
                    }}>
                        <h1 style={{ fontSize: '24px', margin: 0, color: '#000', fontWeight: 'bold' }}>
                            Map management
                        </h1>
                    </div>

                    {/* منطقة الخريطة (تمتد لتملأ باقي مساحة المربع الأبيض الداخلي) */}
                    <div style={{ 
                        flexGrow: 1, 
                        padding: '30px', // مسافة داخلية مريحة حول الخريطة
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ 
                            flexGrow: 1, 
                            borderRadius: '4px', 
                            overflow: 'hidden', 
                            border: '1px solid #777777',
                            minHeight: '450px' // حد أدنى للارتفاع لضمان ظهور الخريطة بشكل ممتاز
                        }}>
                            <AlertsMapPanel pins={alertsData.mapPins} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AlertsPage;