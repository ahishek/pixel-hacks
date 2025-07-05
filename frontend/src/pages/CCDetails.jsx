import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, FileText, Gift, CreditCard, Plus } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import CreditCardComponent from '../components/CreditCard';
import TransactionHistory from '../components/TransactionHistory';
import { mockCardData, mockTransactions } from '../data/mock';

const CCDetails = () => {
  const navigate = useNavigate();

  const handlePushTokens = () => {
    navigate('/merchant-apps');
  };

  const handleManageTokens = () => {
    navigate('/manage-tokens');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft className="w-6 h-6" />
            <h1 className="text-lg font-semibold">Pixel Play Credit Card</h1>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Credit Card */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <CreditCardComponent cardData={mockCardData} />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handlePushTokens}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Push Tokens
          </Button>
          <Button
            onClick={handleManageTokens}
            variant="outline"
            className="border-teal-500 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950 font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Manage Tokens
          </Button>
        </div>

        {/* Bottom Navigation */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <FileText className="w-8 h-8 mx-auto mb-2 text-teal-600" />
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Statements</div>
          </Card>
          <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Gift className="w-8 h-8 mx-auto mb-2 text-teal-600" />
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Rewards</div>
          </Card>
          <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <CreditCard className="w-8 h-8 mx-auto mb-2 text-teal-600" />
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">EMIs</div>
          </Card>
          <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Settings className="w-8 h-8 mx-auto mb-2 text-teal-600" />
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Settings</div>
          </Card>
        </div>

        {/* Account Info */}
        <Card className="p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Unspent Amount</span>
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">₹{mockCardData.unspentAmount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Next Statement on {mockCardData.nextStatementDate}</span>
              <Button variant="outline" size="sm" className="text-teal-600 border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950">
                Pay
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Outstanding</div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">₹{mockCardData.totalOutstanding}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Available Credit</div>
                <div className="text-lg font-semibold text-teal-600">₹{mockCardData.availableLimit.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Transaction History */}
        <TransactionHistory transactions={mockTransactions} />
      </div>
    </div>
  );
};

export default CCDetails;