import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlertsMapPanel from '../components/AlertsMapPanel';
import DashboardSidebar from '../components/DashboardSidebar';
import OrganizationLayout from '../components/OrganizationLayout';
import useAlertsData from '../hooks/useAlertsData';
import { ROUTES } from '../utils/constants';

function AlertsPage() {
    const navigate = useNavigate();
    const {
        alertsData,
        isLoading,
        isSubmitting,
        error,
        actionError,
        handleCreatePin,
        handleDeletePin,
    } = useAlertsData();

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
        <OrganizationLayout
            sidebar={
                <DashboardSidebar
                    menuItems={alertsData.menuItems}
                    activeMenuIndex={2}
                    activeFooterItem=""
                    onSelectMenuItem={handleSidebarSelect}
                    onSelectFooterItem={handleFooterSelect}
                />
            }
        >
            <div className="flex min-h-[85vh] flex-col rounded-lg border border-[#777777] bg-white">
                <div className="mt-2 border-b border-[#777777] px-4 py-3 sm:px-8 sm:py-4">
                    <h1 className="m-0 text-lg font-bold text-black sm:text-2xl">
                        Map management
                    </h1>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
                    {error ? (
                        <div className="mb-3 text-sm font-bold text-[#8a1f1f]">{error}</div>
                    ) : null}
                    <div className="min-h-[350px] flex-1 overflow-hidden rounded border border-[#777777] sm:min-h-[450px]">
                        {isLoading ? (
                            <div className="py-12 text-center font-bold text-[#49987A] sm:py-16">
                                Loading map pins...
                            </div>
                        ) : (
                            <AlertsMapPanel
                                pins={alertsData.mapPins}
                                onCreatePin={handleCreatePin}
                                onDeletePin={handleDeletePin}
                                isSubmitting={isSubmitting}
                                actionError={actionError}
                            />
                        )}
                    </div>
                </div>
            </div>
        </OrganizationLayout>
    );
}

export default AlertsPage;
