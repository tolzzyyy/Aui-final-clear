import React from 'react'
import AdminTopNav from './AdminTopNav';
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-dvh ">
      {/* Sticky TopNav with z-index */}
      <div className="sticky top-0 z-50 w-full">
        <AdminTopNav />
      </div>

      {/* Scrollable Outlet (adjust padding to avoid TopNav overlap) */}
      <div className="flex-1 overflow-y-auto "> {/* Adjust pt to TopNav's height */}
      {  <Outlet />}
      </div>
    </div>
  );
}

export default AdminLayout