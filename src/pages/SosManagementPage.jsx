import { useNavigate } from 'react-router-dom';
import AlertDetailsPanel from '../components/AlertDetailsPanel';
import DashboardSidebar from '../components/DashboardSidebar';
import SosManagementTable from '../components/SosManagementTable';
import SosStatusSummary from '../components/SosStatusSummary';
import OrganizationLayout from '../components/OrganizationLayout';
import useSosManagementData from '../hooks/useSosManagementData';
import { ROUTES, SOS_MANAGEMENT_CONTENT } from '../utils/constants';
import React, { useState, useEffect } from 'react';

function SosManagementPage() {
const navigate = useNavigate();
const {
	sosManagementData,
	selectedDetail,
	isLoading,
	isDetailLoading,
	isUpdating,
	error,
	detailError,
	updateError,
	fetchDetail,
	updateSosStatus,
} = useSosManagementData();

const [selectedAlert, setSelectedAlert] = useState(null);

useEffect(() => {
	if (sosManagementData?.alertRows && sosManagementData.alertRows.length > 0 && !selectedAlert) {
		const firstRow = sosManagementData.alertRows[0];
		setSelectedAlert(firstRow);
		fetchDetail(firstRow);
	}
}, [sosManagementData, selectedAlert, fetchDetail]);

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

async function handleRowClick(row) {
	setSelectedAlert(row);
	await fetchDetail(row);
}

async function onStatusUpdate(uiStatus) {
	if (!selectedAlert) return;
	const result = await updateSosStatus(selectedAlert, uiStatus);
	if (result.success) {
		setSelectedAlert(result.detail);
	}
}

return (
	<OrganizationLayout
		sidebar={
			<DashboardSidebar
				menuItems={sosManagementData?.menuItems}
				activeMenuIndex={1}
				onSelectMenuItem={handleSidebarSelect}
				onSelectFooterItem={handleFooterSelect}
			/>
		}
	>
		<div className="flex min-h-[85vh] flex-col rounded-lg border border-[#777777] bg-white">
			<div className="mt-2 border-b border-[#777777] px-4 py-3 sm:px-8 sm:py-4">
				<h1 className="m-0 text-lg font-bold text-black sm:text-2xl">
					sos mangement
				</h1>
			</div>

			<div className="flex flex-col gap-5 p-4 sm:p-6 lg:p-8">
				<h2 className="m-0 border-b border-[#b5b5b5] pb-2 text-xl font-semibold text-[#1f1f1f] sm:text-2xl">
					{SOS_MANAGEMENT_CONTENT.title}
				</h2>

				{error ? (
					<div className="text-sm font-bold text-[#8a1f1f]">{error}</div>
				) : null}

				{isLoading ? (
					<div className="py-10 text-center font-bold text-[#49987A]">
						Loading SOS alerts...
					</div>
				) : (
					<>
						<SosStatusSummary items={sosManagementData?.statusSummary} />

						<div className="grid gap-4 xl:grid-cols-[1fr_265px]">
							<SosManagementTable
								columns={SOS_MANAGEMENT_CONTENT.columns}
								historyRows={sosManagementData?.alertRows}
								onRowClick={handleRowClick}
								selectedId={selectedAlert?.alertId}
							/>

							{selectedAlert ? (
								<AlertDetailsPanel
									title="Alert Details"
									details={selectedDetail ?? selectedAlert}
									isLoading={isDetailLoading}
									isUpdating={isUpdating}
									error={detailError || updateError}
									onStatusUpdate={onStatusUpdate}
								/>
							) : (
								<div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white p-6 text-center text-gray-400">
									اضغطي على أي اسم في الجدول لعرض التفاصيل
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	</OrganizationLayout>
);
}

export default SosManagementPage;
