import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import OrganizationLayout from '../components/OrganizationLayout';
import { SETTINGS_CONTENT, ROUTES } from '../utils/constants';

const SettingsPage = () => {
    const navigate = useNavigate();

    function handleSidebarSelect(index) {
        if (index === 0) navigate(ROUTES.DASHBOARD);
        if (index === 1) navigate(ROUTES.SOS_MANAGEMENT);
        if (index === 2) navigate(ROUTES.ALERTS);
    }

    function handleFooterSelect(item) {
        if (item === 'settings') {
            navigate(ROUTES.SETTINGS);
        } else if (item === 'logout') {
            navigate(ROUTES.SIGN_IN);
        }
    }

    return (
        <OrganizationLayout
            sidebar={
                <DashboardSidebar
                    menuItems={['Dashboard', 'SOS management', 'Map management']}
                    activeMenuIndex={-1}
                    activeFooterItem="settings"
                    onSelectMenuItem={handleSidebarSelect}
                    onSelectFooterItem={handleFooterSelect}
                />
            }
        >
            <div className="min-h-[85vh] rounded-lg border border-[#777777] bg-white">
                <div className="mt-2 border-b border-[#777777] px-4 py-3 sm:px-8 sm:py-4">
                    <h1 className="m-0 text-lg font-bold text-black sm:text-2xl">
                        {SETTINGS_CONTENT.title}
                    </h1>
                </div>

                <div className="mt-4 flex sm:mt-6">
                    <div className="flex h-[41px] w-full max-w-[164px] items-center justify-center bg-[#49987A] text-sm font-bold text-black sm:text-base">
                        {SETTINGS_CONTENT.tabLabel}
                    </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex w-full max-w-full flex-col overflow-hidden rounded border border-[#777777] sm:min-h-[198px]">
                        <div className="border-b border-[#777777] bg-[#49987A] px-4 py-3 text-base font-bold text-black sm:px-5 sm:py-4 sm:text-lg">
                            {SETTINGS_CONTENT.sectionTitle}
                        </div>

                        <div className="flex flex-1 flex-col items-start justify-center gap-4 px-4 py-6 sm:flex-row sm:items-center sm:gap-16 sm:px-10">
                            <span className="text-base font-bold text-black sm:text-lg">
                                {SETTINGS_CONTENT.fieldLabel}
                            </span>

                            <button
                                type="button"
                                className="h-[41px] w-full max-w-[244px] cursor-pointer rounded border border-[#CFC9C9] bg-[#49987A] text-sm font-bold text-black"
                            >
                                {SETTINGS_CONTENT.fieldValue}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </OrganizationLayout>
    );
};

export default SettingsPage;
