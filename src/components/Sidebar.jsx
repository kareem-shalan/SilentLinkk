import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// استيراد الأيقونات الأساسية اللي إنتي مستخدماها بالفعل
import DashboardIcon from '../assets/dashboard-icon.svg';
import OrgIcon from '../assets/org-icon.svg';
import UsersIcon from '../assets/users-icon.svg';
import LogoutIcon from '../assets/logout-icon.svg';
import SettingsIcon from '../assets/setting-icon.svg'; 
import NameIcon from '../assets/name-icon.svg'; // الأيقونة الافتراضية للبروفايل

function getInitialSidebarState() {
  const currentRole = localStorage.getItem('role') || 'admin';
  const savedName = localStorage.getItem('orgName');
  const savedLogo = localStorage.getItem('orgLogo');

  if (currentRole === 'organization') {
    return {
      role: currentRole,
      profileName: savedName || 'Malak Khaled',
      logo: savedLogo || NameIcon,
    };
  }

  return {
    role: currentRole,
    profileName: 'Malak Khaled',
    logo: NameIcon,
  };
}

const Sidebar = () => {
  const navigate = useNavigate();
  const [{ role, profileName, logo }] = useState(getInitialSidebarState);

  const handleLogout = () => {
    // بننظف الـ localStorage عند الخروج عشان ما يحصلش تضارب في التوكنز
    localStorage.clear();
    navigate('/sign-in');
  };

  return (
    <div className="w-[260px] h-screen bg-[#49987A] text-white fixed left-0 top-0 flex flex-col py-8 px-4 z-50">
      
      {/* 👤 جزء البروفايل/اللوجو الديناميكي */}
      <div className="flex items-center gap-4 mb-10 px-4">
        <img 
          src={logo} 
          alt="Profile" 
          className="w-[40px] h-[40px] rounded-full object-cover border border-white/20"
          // الحماية الذكية: لو رابط اللوجو من السيرفر بايظ أو مش موجود بيعرض الأيقونة الافتراضية فوراً
          onError={(e) => { e.target.src = NameIcon; }} 
        />
        <span className="text-sm font-bold truncate max-w-[160px]">{profileName}</span>
      </div>

      {/* 📋 القائمة الأساسية: تتبدل تلقائياً حسب نوع الحساب */}
      <nav className="flex-1 space-y-2">
        {role === 'admin' ? (
          /* 👑 لينكات لوحة تحكم الأدمن الكبير */
          <>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-3 rounded-lg transition-all ${
                  isActive ? 'bg-[#D4CDCD] text-[#2D5A49] font-bold' : 'hover:bg-[#3d8168]'
                }`
              }
            >
              <img src={DashboardIcon} className="w-6 h-6" alt="" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/organizations"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-3 rounded-lg transition-all ${
                  isActive ? 'bg-[#D4CDCD] text-[#2D5A49] font-bold' : 'hover:bg-[#3d8168]'
                }`
              }
            >
              <img src={OrgIcon} className="w-6 h-6" alt="" />
              <span>Organizations</span>
            </NavLink>

            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-3 rounded-lg transition-all ${
                  isActive ? 'bg-[#D4CDCD] text-[#2D5A49] font-bold' : 'hover:bg-[#3d8168]'
                }`
              }
            >
              <img src={UsersIcon} className="w-6 h-6" alt="" />
              <span>Users</span>
            </NavLink>
          </>
        ) : (
          /* 🏥 لينكات لوحة تحكم المنظمة الحالية (مثل منظمة المغرب) */
          <>
            <NavLink
              to="/organization-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-3 rounded-lg transition-all ${
                  isActive ? 'bg-[#D4CDCD] text-[#2D5A49] font-bold' : 'hover:bg-[#3d8168]'
                }`
              }
            >
              <img src={DashboardIcon} className="w-6 h-6" alt="" />
              <span>Org Dashboard</span>
            </NavLink>

            <NavLink
              to="/org-coverage"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-3 rounded-lg transition-all ${
                  isActive ? 'bg-[#D4CDCD] text-[#2D5A49] font-bold' : 'hover:bg-[#3d8168]'
                }`
              }
            >
              <img src={OrgIcon} className="w-6 h-6" alt="" />
              <span>Coverage Map</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* ⚙️ الجزء السفلي (الإعدادات وتسجيل الخروج) */}
      <div className="border-t border-[#ffffff33] pt-6 space-y-2">
        <NavLink
          to={role === 'admin' ? "/admin-settings" : "/org-settings"}
          className={({ isActive }) =>
            `flex items-center gap-4 px-6 py-3 rounded-lg transition-all ${
              isActive ? 'bg-[#D4CDCD] text-[#2D5A49] font-bold' : 'hover:bg-[#3d8168]'
            }`
          }
        >
          <img src={SettingsIcon} className="w-6 h-6" alt="" />
          <span>Settings</span>
        </NavLink>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-[#3d8168] transition-all text-left"
        >
          <img src={LogoutIcon} className="w-6 h-6" alt="" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;