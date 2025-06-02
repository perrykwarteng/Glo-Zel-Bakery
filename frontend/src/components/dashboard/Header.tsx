import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileSidebar }) => {
  const { activePage } = useAppContext();
  
  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Dashboard';
      case 'orders': return 'Orders';
      case 'customers': return 'Customers';
      case 'inventory': return 'Inventory';
      case 'transactions': return 'Transactions';
      case 'analytics': return 'Analytics';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <button 
          className="mr-4 text-amber-800 hover:text-amber-600 md:hidden"
          onClick={toggleMobileSidebar}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <button className="relative p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-300 mx-2"></div>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center">
            <span className="font-medium text-amber-800 text-sm">GB</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;