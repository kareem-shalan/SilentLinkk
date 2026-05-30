import { useNavigate } from 'react-router-dom';
import AlertDetailsPanel from '../components/AlertDetailsPanel';
import DashboardSidebar from '../components/DashboardSidebar';
import SosManagementTable from '../components/SosManagementTable';
import SosStatusSummary from '../components/SosStatusSummary';
import useSosManagementData from '../hooks/useSosManagementData';
import { ROUTES, SOS_MANAGEMENT_CONTENT } from '../utils/constants';
import React, { useState, useEffect } from 'react';

function SosManagementPage() {
const navigate = useNavigate();
const { sosManagementData } = useSosManagementData();

// تعديل الأمان: بنخلي الحالة المبدئية null وتتحدث تلقائياً أول ما الداتا توصل  
const [selectedAlert, setSelectedAlert] = useState(null);  

// لقط أول عنصر تلقائياً عشان يملأ الـ Panel اليمين أول ما الصفحة تفتح  
useEffect(() => {  
	if (sosManagementData?.alertRows && sosManagementData.alertRows.length > 0) {  
		setSelectedAlert(sosManagementData.alertRows[0]);  
	}  
}, [sosManagementData]);  

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
		  
		{/* السايد بار بنفس مقاسه وثباته في صفحة الداشبورد بالملي */}  
		<div style={{ width: '300px', height: '100vh', position: 'fixed' }}>  
			<DashboardSidebar  
				menuItems={sosManagementData?.menuItems}  
				activeMenuIndex={1}  
				onSelectMenuItem={handleSidebarSelect}  
				onSelectFooterItem={handleFooterSelect}  
			/>  
		</div>  

		{/* المحتوى بنفس مقاسات الأبعاد والـ Layout والـ Padding المتطابق مع الداشبورد */}  
		<div style={{ flexGrow: 1, marginLeft: '320px', padding: '40px' }}>  
			<div style={{   
				backgroundColor: '#fff',   
				border: '1px solid #777777',   
				borderRadius: '8px',   
				minHeight: '85vh',  
				display: 'flex',  
				flexDirection: 'column'  
			}}>  
				  
				{/* الهيدر العلوي بنفس الديزاين الموحد */}  
				<div style={{   
					padding: '15px 30px',   
					borderBottom: '1px solid #777777',  
					marginTop: '10px'  
				}}>  
					<h1 style={{ fontSize: '24px', margin: 0, color: '#000', fontWeight: 'bold' }}>  
						sos mangement  
					</h1>  
				</div>  

				{/* الحاوية الداخلية للـ Elements */}  
				<div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>  
					  
					<h2 className="m-0 border-b border-[#b5b5b5] pb-2 text-[length:var(--font-size-2xl)] font-semibold text-[#1f1f1f] md:text-[length:2rem]">  
						{SOS_MANAGEMENT_CONTENT.title}  
					</h2>  
					  
					<SosStatusSummary items={sosManagementData?.statusSummary} />  
					  
					<div className="grid gap-4 xl:grid-cols-[1fr_265px]">  
						<SosManagementTable  
							columns={SOS_MANAGEMENT_CONTENT.columns}  
							historyRows={sosManagementData?.alertRows}  
							onRowClick={(row) => setSelectedAlert(row)}   
							selectedId={selectedAlert?.alertId}  
						/>  

						{selectedAlert ? (  
							<AlertDetailsPanel  
								title="Alert Details"  
								details={selectedAlert}  
							/>  
						) : (  
							<div className="bg-white p-6 rounded-lg text-center text-gray-400 flex items-center justify-center border-2 border-dashed border-gray-200">  
								اضغطي على أي اسم في الجدول لعرض التفاصيل  
							</div>  
						)}  
					</div>  

				</div>  

			</div>  
		</div>  

	</div>  
);

}

export default SosManagementPage;