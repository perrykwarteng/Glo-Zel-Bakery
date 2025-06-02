import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { CreditCard, DollarSign, Landmark } from 'lucide-react';

const RecentTransactions: React.FC = () => {
  const { transactions, setActivePage } = useAppContext();
  
  // Get the most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard size={16} className="text-blue-500" />;
      case 'cash':
        return <DollarSign size={16} className="text-green-500" />;
      case 'transfer':
        return <Landmark size={16} className="text-purple-500" />;
      default:
        return <CreditCard size={16} className="text-gray-500" />;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100">
                  {getPaymentMethodIcon(transaction.method)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">
                    Order #{transaction.orderId}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  ${transaction.amount.toFixed(2)}
                </p>
                <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${getStatusClass(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 text-center">
        <button 
          className="text-amber-600 hover:text-amber-900 text-sm font-medium"
          onClick={() => setActivePage('transactions')}
        >
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;