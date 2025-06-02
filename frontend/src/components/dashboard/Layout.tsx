import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isMobileOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar} />
      
      <div className="flex-1 flex flex-col md:ml-64">
        <Header toggleMobileSidebar={toggleMobileSidebar} />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;