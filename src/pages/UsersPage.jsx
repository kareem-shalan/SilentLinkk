import React, { useEffect, useMemo, useState } from 'react';
import SearchIcon from '../assets/search-icon.svg';
import Sidebar from '../components/Sidebar';
import { apiUrl } from '../services/organizationApi';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl('/api/admin/users'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.log(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  // 🎯 الدالة المعدلة والمضمونة لعمل Block و Unblock للمستخدمين
  async function handleUserAction(userId, actionType) {
    const token = localStorage.getItem('token');
    
    // ضبط كلمة الأكشن بالملي لتطابق متطلبات السيرفر
    let formattedAction = '';
    if (actionType === 'block') formattedAction = 'Block';
    else if (actionType === 'active') formattedAction = 'Unblock';
    else if (actionType === 'delete') formattedAction = 'Delete';

    // الـ Payload المظبوط (الحروف الأولى صغيرة للـ Keys)
    const payload = {
      userId: Number(userId) || userId,
      action: formattedAction
    };

    try {
      const response = await fetch(apiUrl('/api/admin/users/action'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 200 || response.status === 204) {
        if (actionType === 'delete') {
          setUsers(prev => prev.filter(u => (u.UserId || u.userId) !== userId));
          alert(`User deleted successfully! 🎉`);
        } else {
          // تحديث الحالة لايف في الجدول فوراً
          setUsers(prev => prev.map(u => {
            const currentId = u.UserId || u.userId;
            if (currentId === userId) {
              const newStatus = actionType === 'block' ? 'blocked' : 'active';
              return { 
                ...u, 
                status: newStatus, 
                Status: newStatus 
              };
            }
            return u;
          }));
          alert(`User updated to ${formattedAction} successfully! 🎉`);
        }
      } else {
        alert('Failed to perform user action. تأكدي من صلاحيات الأدمن.');
      }
    } catch (error) {
      console.error('Error performing user action:', error);
      alert('حدث خطأ أثناء الاتصال بالسيرفر.');
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const email = user.Email || user.email || '';
      return email.toLowerCase().includes(search.toLowerCase());
    });
  }, [users, search]);

  return (
    <div className="flex bg-[#F3F4F6] min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] p-8 text-left">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-bold text-[#49987A] mb-8">Users</h2>

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
                  <th className="px-6 py-4 border-r border-gray-300">Email</th>
                  <th className="px-6 py-4 border-r border-gray-300">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {loading ? (
                  <tr><td colSpan="3" className="text-center py-8">Loading...</td></tr>
                ) : filteredUsers.length === 0 ? (
                  <tr><td colSpan="3" className="text-center py-8">No users found</td></tr>
                ) : (
                  filteredUsers.map((user, i) => {
                    const userId = user.UserId || user.userId;
                    const isBlocked = String(user.Status || user.status).toLowerCase() === 'blocked' || user.status === '2';
                    return (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-bold">{user.Email || user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-4 py-1 rounded text-white text-[10px] font-bold ${isBlocked ? 'bg-[#E09A9A]' : 'bg-[#49987A]'}`}>
                            {isBlocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center flex justify-center gap-2">
                          <button 
                            onClick={() => handleUserAction(userId, isBlocked ? 'active' : 'block')}
                            className={`${isBlocked ? 'bg-[#49987A]' : 'bg-[#BDBDBD]'} text-white px-3 py-1 rounded text-[10px] font-bold w-[93px]`}
                          >
                            {isBlocked ? 'Unblock' : 'Block'}
                          </button>
                          <button 
                            onClick={() => handleUserAction(userId, 'delete')}
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

export default UsersPage;