import React from 'react';
import { Card } from './ui/card';
import { Receipt } from 'lucide-react';

const TransactionHistory = ({ transactions }) => {
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'ride': return '🚗';
      case 'shopping': return '🛍️';
      case 'recharge': return '📱';
      case 'grocery': return '🛒';
      default: return '💳';
    }
  };

  if (transactions.length === 0) {
    return (
      <Card className="p-8 text-center bg-gray-50 dark:bg-gray-900">
        <Receipt className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
          No Transactions Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Make your first payment and earn rewards on the brands you love
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Recent Transactions
      </h3>
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-lg">
                {getTransactionIcon(transaction.type)}
              </div>
              <div>
                <div className="font-semibold text-gray-800 dark:text-gray-200">
                  {transaction.merchant}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(transaction.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-gray-800 dark:text-gray-200">
                ₹{transaction.amount}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 capitalize">
                {transaction.status}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TransactionHistory;