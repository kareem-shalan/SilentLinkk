import React, { useEffect, useState } from 'react';
import OrgIcon from '../assets/org-icon.svg';
import UsersIcon from '../assets/users-icon.svg';
import PendingIcon from '../assets/pending-icon.svg';
import Sidebar from '../components/Sidebar';
import { apiUrl } from '../services/organizationApi';

const AdminDashboardPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const [orgsRes, usersRes] = await Promise.all([
          fetch(apiUrl('/api/admin/organizations'), {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(apiUrl('/api/admin/users'), {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const orgsData = await orgsRes.json();
        const usersData = await usersRes.json();

        setOrganizations(orgsData.organizations || []);
        setUsers(usersData.users || []);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="flex bg-[#F3F4F6] min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 ml-[260px] p-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-left">Dashboard Admin</h2>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { t1: 'Total', t2: 'Organizations', count: organizations.length, icon: OrgIcon },
              { t1: 'Total', t2: 'Users', count: users.length, icon: UsersIcon },
              { t1: 'Active', t2: 'Users', count: users.filter(u => u.Status === 'active' || u.status === 'active').length, icon: UsersIcon },
              { t1: 'Pending', t2: 'Approvals', count: organizations.filter(o => o.IsActive === false || o.status === 'blocked').length, icon: PendingIcon }
            ].map((stat, i) => (
              <div key={i} className="bg-[#49987A] h-[151px] rounded-lg shadow-sm text-white p-4 relative flex flex-col items-center justify-center">
                <img src={stat.icon} alt="icon" className="absolute top-3 left-3 w-8 h-8 object-contain" />
                <div className="text-center">
                  <p className="text-[14px] leading-tight font-light">{stat.t1}</p>
                  <p className="text-[18px] font-bold leading-tight mb-2">{stat.t2}</p>
                  <h3 className="text-4xl font-extrabold">{loading ? '...' : stat.count}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 border border-gray-200">
            <div className="bg-[#49987A] px-6 py-3 text-white font-bold text-xl">Latest Organizations</div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#D4CDCD] text-gray-800 font-bold">
                <tr>
                  <th className="px-6 py-3 border-r border-gray-300">Name</th>
                  <th className="px-6 py-3 border-r border-gray-300">Email</th>
                  <th className="px-6 py-3 border-r border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {loading ? (
                  <tr><td colSpan="3" className="text-center py-4">Loading...</td></tr>
                ) : organizations.length === 0 ? (
                  <tr><td colSpan="3" className="text-center py-4">No organizations found</td></tr>
                ) : (
                  organizations.slice(0, 5).map((org, i) => {
                    const isBlocked = org.status === 'blocked' || org.Status === 'blocked';
                    return (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-3 text-sm font-bold">{org.Name || org.name}</td>
                        <td className="px-6 py-3 text-sm font-bold">{org.Email || org.email}</td>
                        <td className="px-6 py-3">
                          <span className={`px-4 py-1 rounded text-white text-xs font-bold ${isBlocked ? 'bg-[#E09A9A]' : 'bg-[#49987A]'}`}>
                            {isBlocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="bg-[#49987A] px-6 py-3 text-white font-bold text-xl">Latest Users</div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#D4CDCD] text-gray-800 font-bold">
                <tr>
                  <th className="px-6 py-3 border-r border-gray-300">Email</th>
                  <th className="px-6 py-3 border-r border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {loading ? (
                  <tr><td colSpan="2" className="text-center py-4">Loading...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan="2" className="text-center py-4">No users found</td></tr>
                ) : (
                  users.slice(0, 5).map((user, i) => {
                    const isBlocked = user.Status === 'blocked' || user.status === 'blocked';
                    return (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-3 text-sm font-bold">{user.Email || user.email}</td>
                        <td className="px-6 py-3">
                          <span className={`px-4 py-1 rounded text-white text-xs font-bold ${isBlocked ? 'bg-[#E09A9A]' : 'bg-[#49987A]'}`}>
                            {isBlocked ? 'Blocked' : 'Active'}
                          </span>
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

export default AdminDashboardPage;