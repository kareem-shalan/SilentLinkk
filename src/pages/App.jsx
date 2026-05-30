import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import OrganizationsPage from './pages/OrganizationsPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage'; 
import Sidebar from './components/Sidebar';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route 
          path="/*" 
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1">
                <Routes>
                  <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                  <Route path="/organizations" element={<OrganizationsPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;