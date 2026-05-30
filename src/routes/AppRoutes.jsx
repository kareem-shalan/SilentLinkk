import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import AlertsPage from '../pages/AlertsPage';
import SettingsPage from '../pages/SettingsPage';
import SignInPage from '../pages/SignInPage';
import SosManagementPage from '../pages/SosManagementPage';

// الصفحات الجديدة (لوحة تحكم الأدمن)
import AdminDashboardPage from '../pages/AdminDashboardPage';
import UsersPage from '../pages/UsersPage';
import OrganizationsPage from '../pages/OrganizationsPage';
import AdminSettingsPage from '../pages/AdminSettingsPage'; // الصفحة اللي عملنا لها رينيم

import { ROUTES } from '../utils/constants';

function AppRoutes() {
	return (
		<Routes>
			{/* الصفحة الرئيسية بتحولك لصفحة تسجيل الدخول */}
			<Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.SIGN_IN} replace />} />
			<Route path={ROUTES.SIGN_IN} element={<SignInPage />} />

			{/* --- مسارات المنظمة (الداش بورد القديمة) --- */}
			<Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
			<Route path={ROUTES.SOS_MANAGEMENT} element={<SosManagementPage />} />
			<Route path={ROUTES.ALERTS} element={<AlertsPage />} />
			<Route path={ROUTES.SETTINGS} element={<SettingsPage />} />

			{/* --- مسارات الأدمن (الداش بورد الجديدة) --- */}
			<Route path="/admin-dashboard" element={<AdminDashboardPage />} />
			<Route path="/users" element={<UsersPage />} />
			<Route path="/organizations" element={<OrganizationsPage />} />
			{/* المسار الجديد لسيتنجس الأدمن */}
			<Route path="/admin-settings" element={<AdminSettingsPage />} />

			{/* لو حد كتب لينك غلط يرجعه للـ Sign In */}
			<Route path="*" element={<Navigate to={ROUTES.SIGN_IN} replace />} />
		</Routes>
	);
}

export default AppRoutes;