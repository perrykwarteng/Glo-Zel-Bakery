import React from "react";
import { useAppContext } from "../../context/AppContext";
import { CreditCard, LayoutDashboard, ShoppingCart, X } from "lucide-react";
import Logo from "../../../asset/logo.png";

interface SidebarProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

// Users,
// Database,
// CreditCard,
// BarChart,
// Settings,
// Menu,
const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  toggleMobileSidebar,
}) => {
  const { activePage, setActivePage } = useAppContext();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "orders", label: "Orders", icon: <ShoppingCart size={20} /> },
    {
      id: "transactions",
      label: "Transactions",
      icon: <CreditCard size={20} />,
    },
    // { id: "customers", label: "Customers", icon: <Users size={20} /> },
    // { id: "inventory", label: "Inventory", icon: <Database size={20} /> },
    // { id: "analytics", label: "Analytics", icon: <BarChart size={20} /> },
    // { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  const sidebarClasses = `
    bg-amber-50 text-amber-900 h-full w-64 fixed left-0 top-0 z-30
    transition-transform duration-300 ease-in-out
    shadow-lg md:shadow-none flex flex-col
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex items-center justify-between p-4 border-b border-amber-200">
          <div className="flex items-center ml-10 space-x-3">
            <img className="w-[120px]" src={Logo} alt="main logo" />
          </div>
          <button
            className="md:hidden text-amber-800 hover:text-amber-600"
            onClick={toggleMobileSidebar}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 pt-6 pb-8 px-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200 ease-in-out
                    ${
                      activePage === item.id
                        ? "bg-amber-300 text-white font-medium"
                        : "text-sec hover:bg-amber-100"
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-amber-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center">
              <span className="font-medium text-amber-800">GB</span>
            </div>
            <div>
              <p className="text-sec font-medium">Bakery Admin</p>
              <p className="text-sm text-amber-700">Glo-Zel Bakery</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
