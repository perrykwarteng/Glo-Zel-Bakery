import React from 'react';
import { useAppContext } from "../../context/AppContext";
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const InventoryStatus: React.FC = () => {
  const { products, setActivePage } = useAppContext();
  
  // Sort products by stock level (lowest first)
  const sortedProducts = [...products].sort((a, b) => a.stock - b.stock);
  
  const getStockStatusIcon = (stock: number) => {
    if (stock <= 10) {
      return <AlertTriangle size={16} className="text-red-500" />;
    } else if (stock <= 20) {
      return <Clock size={16} className="text-amber-500" />;
    } else {
      return <CheckCircle size={16} className="text-green-500" />;
    }
  };
  
  const getStockStatusText = (stock: number) => {
    if (stock <= 10) {
      return 'Low';
    } else if (stock <= 20) {
      return 'Medium';
    } else {
      return 'Good';
    }
  };
  
  const getStockStatusClass = (stock: number) => {
    if (stock <= 10) {
      return 'text-red-500';
    } else if (stock <= 20) {
      return 'text-amber-500';
    } else {
      return 'text-green-500';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Inventory Status</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {sortedProducts.slice(0, 5).map((product) => (
          <div key={product.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getStockStatusIcon(product.stock)}
                <span className="ml-3 text-gray-800 font-medium">{product.name}</span>
              </div>
              <div className={`font-medium ${getStockStatusClass(product.stock)}`}>
                {getStockStatusText(product.stock)}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">{product.stock} units remaining</span>
              <div className="w-24 bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    product.stock <= 10
                      ? 'bg-red-500'
                      : product.stock <= 20
                        ? 'bg-amber-500'
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 text-center">
        <button 
          className="text-amber-600 hover:text-amber-900 text-sm font-medium"
          onClick={() => setActivePage('inventory')}
        >
          Manage Inventory
        </button>
      </div>
    </div>
  );
};

export default InventoryStatus;