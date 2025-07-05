import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Shield, Sparkles, ArrowRight, Settings } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockMerchantApps } from '../data/mock';

const SuccessState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedApps = location.state?.selectedApps || [];

  const selectedMerchantApps = mockMerchantApps.filter(app => selectedApps.includes(app.id));

  const handleContinue = () => {
    navigate('/cc-details');
  };

  const handleManageTokens = () => {
    navigate('/manage-tokens', { state: { selectedApps } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <div className="text-center space-y-8">
          {/* Success Animation */}
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mx-auto animate-ping opacity-20"></div>
            <Sparkles className="absolute top-2 right-2 w-6 h-6 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute bottom-2 left-2 w-4 h-4 text-purple-400 animate-pulse" />
          </div>

          {/* Success Message */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Card Saved Successfully! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your card is now saved on the selected merchants. You can now make seamless payments!
            </p>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950 dark:to-green-950 p-4 rounded-xl border border-teal-200 dark:border-teal-800">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-semibold text-teal-800 dark:text-teal-200">
                100% Secure
              </span>
            </div>
            <p className="text-xs text-teal-600 dark:text-teal-400">
              Your actual card details remain private and secure
            </p>
          </div>

          {/* Success Summary */}
          <div className="space-y-4">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Your card is now saved on:
              </h3>
              <div className="space-y-2">
                {selectedMerchantApps.map((app) => (
                  <div 
                    key={app.id}
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg"
                  >
                    <div className="text-lg">{app.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {app.name}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        Ready for payments
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleManageTokens}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Your Saved Cards
            </Button>
            <Button
              onClick={handleContinue}
              variant="outline"
              className="w-full border-teal-500 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950 font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Back to Card Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Footer Note */}
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            Your cards are now saved securely. You can enable or disable them anytime from "Manage Your Saved Cards"
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SuccessState;