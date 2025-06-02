import React from "react";
import { useAppContext } from "../context/AppContext";
import Dashboard from "./Dashboard";
import Orders from "./Orders";

const MainContent: React.FC = () => {
  const { activePage } = useAppContext();

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
      // case "customers":
      //   return (
      //     <div className="p-6 bg-white rounded-lg shadow-sm">
      //       <h2 className="text-xl font-bold text-gray-800">Customers</h2>
      //       <p className="mt-4 text-gray-600">
      //         Customer management module will be implemented here.
      //       </p>
      //     </div>
      //   );
      // case "inventory":
      //   return (
      //     <div className="p-6 bg-white rounded-lg shadow-sm">
      //       <h2 className="text-xl font-bold text-gray-800">Inventory</h2>
      //       <p className="mt-4 text-gray-600">
      //         Inventory management module will be implemented here.
      //       </p>
      //     </div>
      //   );
      // case "transactions":
      //   return (
      //     <div className="p-6 bg-white rounded-lg shadow-sm">
      //       <h2 className="text-xl font-bold text-gray-800">Transactions</h2>
      //       <p className="mt-4 text-gray-600">
      //         Transaction history and management module will be implemented
      //         here.
      //       </p>
      //     </div>
      //   );
      // case "analytics":
      //   return (
      //     <div className="p-6 bg-white rounded-lg shadow-sm">
      //       <h2 className="text-xl font-bold text-gray-800">Analytics</h2>
      //       <p className="mt-4 text-gray-600">
      //         Detailed analytics and reporting module will be implemented here.
      //       </p>
      //     </div>
      //   );
      // case "settings":
      //   return (
      //     <div className="p-6 bg-white rounded-lg shadow-sm">
      //       <h2 className="text-xl font-bold text-gray-800">Settings</h2>
      //       <p className="mt-4 text-gray-600">
      //         System settings and configuration module will be implemented here.
      //       </p>
      //     </div>
      //   );
      default:
        return <Dashboard />;
    }
  };

  return renderContent();
};

export default MainContent;
