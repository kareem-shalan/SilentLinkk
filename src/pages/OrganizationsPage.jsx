import React, { useEffect, useMemo, useState } from 'react';
import SearchIcon from '../assets/search-icon.svg';
import Sidebar from '../components/Sidebar';
import { apiUrl } from '../services/organizationApi';

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  async function fetchOrganizations() {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl('/api/admin/organizations'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setOrganizations(data.organizations || []);
    } catch (error) {
      console.log(error);
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  }

  // 🎯 الدالة المعدلة بالملي لتطابق الـ Request المظبوط في السواجر
  async function handleAction(orgId, actionType) {
    const token = localStorage.getItem('token');
    
    // ضبط كلمة الأكشن لتكون الحرف الأول كابيتال (Block / Unblock / Delete) تبعا للسيرفر
    let formattedAction = '';
    if (actionType === 'block') formattedAction = 'Block';
    else if (actionType === 'active') formattedAction = 'Unblock';
    else if (actionType === 'delete') formattedAction = 'Delete';

    // الـ Payload الحقيقي المطابق للسواجر (الحروف الأولى small)
    const payload = {
      organizationId: Number(orgId) || orgId,
      action: formattedAction
    };

    try {
      const response = await fetch(apiUrl('/api/admin/organizations/action'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 200 || response.status === 204) {
        // إذا كان الأكشن حذف، بنشيله من الـ State فوراً
        if (actionType === 'delete') {
          setOrganizations(prev => prev.filter(org => (org.organizationId || org.OrganizationId) !== orgId));
          alert(`Organization deleted successfully! 🎉`);
        } else {
          // تحديث حالة المنظمة لايف في الجدول (تعديل الـ State)
          setOrganizations(prev => prev.map(org => {
            const currentId = org.organizationId || org.OrganizationId;
            if (currentId === orgId) {
              const newStatus = actionType === 'block' ? 'blocked' : 'active';
              return { 
                ...org, 
                status: newStatus, 
                Status: newStatus 
              };
            }
            return org;
          }));
          alert(`Organization updated to ${formattedAction} successfully! 🎉`);
        }
      } else if (response.status === 401) {
        alert('Error 401: Unauthorized. تأكدي أنكِ مسجلة دخول بحساب الأدمن!');
      } else {
        alert('Failed to perform action. السيرفر رفض الطلب.');
      }
    } catch (error) {
      console.error('Error performing action:', error);
      alert('حدث خطأ أثناء الاتصال بالسيرفر.');
    }
  }

  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const name = org.Name || org.name || '';
      const email = org.Email || org.email || '';
      return `${name} ${email}`.toLowerCase().includes(search.toLowerCase());
    });
  }, [organizations, search]);

  return (
    <div className="flex bg-[#F3F4F6] min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] p-8 text-left">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-bold text-[#49987A] mb-8">Organizations</h2>

          <div className="relative mb-6" style={{ width: '1044px', height: '58px' }}>
            <span className="absolute left-5 top-1/2 -translate-y-1/2">
              <img src={SearchIcon} alt="search" className="w-6 h-6 opacity-40" />
            </span>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full bg-white pl-14 pr-6 rounded-lg text-lg outline-none border border-gray-300 shadow-sm"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200" style={{ width: '1044px' }}>
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#D4CDCD] text-gray-800 font-bold">
                <tr>
                  <th className="px-6 py-4 border-r border-gray-300">Name</th>
                  <th className="px-6 py-4 border-r border-gray-300">Email</th>
                  <th className="px-6 py-4 border-r border-gray-300">Country</th>
                  <th className="px-6 py-4 border-r border-gray-300">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-8">Loading...</td></tr>
                ) : filteredOrganizations.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-8">No organizations found</td></tr>
                ) : (
                  filteredOrganizations.map((org, i) => {
                    const orgId = org.OrganizationId || org.organizationId;
                    const isBlocked = org.Status === 'blocked' || org.status === 'blocked' || org.status === '2';
                    return (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-bold">{org.Name || org.name}</td>
                        <td className="px-6 py-4 text-sm font-bold">{org.Email || org.email}</td>
                        <td className="px-6 py-4 text-sm font-bold">{org.Country || org.country}</td>
                        <td className="px-6 py-4">
                          <span className={`px-4 py-1 rounded text-white text-[10px] font-bold ${isBlocked ? 'bg-[#E09A9A]' : 'bg-[#49987A]'}`}>
                            {isBlocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center flex justify-center gap-2">
                          <button 
                            onClick={() => handleAction(orgId, isBlocked ? 'active' : 'block')}
                            className={`${isBlocked ? 'bg-[#49987A]' : 'bg-[#BDBDBD]'} text-white px-3 py-1 rounded text-[10px] font-bold w-[93px]`}
                          >
                            {isBlocked ? 'Unblock' : 'Block'}
                          </button>
                          <button 
                            onClick={() => handleAction(orgId, 'delete')}
                            className="bg-[#E09A9A] text-white px-3 py-1 rounded text-[10px] font-bold w-[93px]"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;