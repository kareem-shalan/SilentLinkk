import React from 'react';
// استيراد السايد بار الجديد
import Sidebar from '../components/Sidebar'; 

const AdminSettingsPage = () => {
  return (
    <div className="flex bg-[#F3F4F6] min-h-screen font-sans">
      {/* 1. السايد بار يظهر هنا */}
      <Sidebar />

      {/* 2. المحتوى الرئيسي مع إزاحة 260px عشان السايد بار */}
      <div className="flex-1 ml-[260px] p-8 text-left">
        <div className="max-w-[1100px] mx-auto">
          
          <h2 className="text-2xl font-bold text-[#49987A] mb-8">Settings</h2>

          <div className="space-y-10">
            
            {/* Profile Settings Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" style={{ width: '1084px' }}>
              <div className="bg-[#49987A] px-6 py-4 text-white font-bold text-lg">
                Profile Settings
              </div>
              
              <div className="p-8 space-y-6">
                {/* Row: Change Photo */}
                <div className="flex items-center">
                  <label className="w-[180px] font-bold text-[#333] text-sm">Change Photo</label>
                  <button 
                    className="flex items-center justify-center gap-2 border border-gray-300 rounded-md text-gray-600 bg-white"
                    style={{ width: '205px', height: '41px' }}
                  >
                    <span className="text-lg">⤒</span> Upload Photo
                  </button>
                </div>

                {/* Row: Change name */}
                <div className="flex items-center">
                  <label className="w-[180px] font-bold text-[#333] text-sm">Change name:</label>
                  <input 
                    type="text" 
                    defaultValue="Malak khaled" 
                    className="border border-gray-300 rounded-md px-3 outline-none focus:border-[#49987A]"
                    style={{ width: '244px', height: '41px' }}
                  />
                </div>

                {/* Row: Change Email */}
                <div className="flex items-center">
                  <label className="w-[180px] font-bold text-[#333] text-sm">Change Email:</label>
                  <input 
                    type="email" 
                    defaultValue="Malak khaked@gmail.com" 
                    className="border border-gray-300 rounded-md px-3 outline-none focus:border-[#49987A]"
                    style={{ width: '338px', height: '41px' }}
                  />
                </div>

                {/* Save Changes Button */}
                <div className="flex justify-center mt-4">
                  <button 
                    className="bg-[#49987A] text-white rounded-md font-bold hover:bg-[#3d8168] transition-colors"
                    style={{ width: '177px', height: '41px' }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Change Password Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" style={{ width: '1084px' }}>
              <div className="bg-[#49987A] px-6 py-4 text-white font-bold text-lg">
                Change Password
              </div>
              
              <div className="p-8 space-y-6">
                {/* Row: Old Password */}
                <div className="flex items-center">
                  <label className="w-[180px] font-bold text-[#333] text-sm">Old Password</label>
                  <input 
                    type="password" 
                    defaultValue="************" 
                    className="border border-gray-300 rounded-md px-3 outline-none"
                    style={{ width: '244px', height: '41px' }}
                  />
                </div>

                {/* Row: New Password */}
                <div className="flex items-center">
                  <label className="w-[180px] font-bold text-[#333] text-sm">New Password:</label>
                  <input 
                    type="password" 
                    placeholder="New Password" 
                    className="border border-gray-300 rounded-md px-3 outline-none"
                    style={{ width: '244px', height: '41px' }}
                  />
                </div>

                {/* Row: Confirm Password */}
                <div className="flex items-center">
                  <label className="w-[180px] font-bold text-[#333] text-sm">Confirm Password:</label>
                  <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    className="border border-gray-300 rounded-md px-3 outline-none"
                    style={{ width: '244px', height: '41px' }}
                  />
                </div>

                {/* Update Password Button */}
                <div className="flex justify-center mt-4">
                  <button 
                    className="bg-[#49987A] text-white rounded-md font-bold hover:bg-[#3d8168] transition-colors"
                    style={{ width: '192px', height: '41px' }}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;