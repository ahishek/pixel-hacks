import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, ToggleLeft, ToggleRight } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { mockMerchantApps } from '../data/mock';

const ManageTokens = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const newlyCreatedTokens = location.state?.selectedApps || [];
  
  const [tokenStates, setTokenStates] = useState(
    mockMerchantApps.reduce((acc, app) => {
      // If this app was just created, make it active, otherwise random
      const wasJustCreated = newlyCreatedTokens.includes(app.id);
      acc[app.id] = { 
        active: wasJustCreated ? true : Math.random() > 0.5, 
        lastUsed: wasJustCreated ? new Date() : new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        isNew: wasJustCreated
      };
      return acc;
    }, {})
  );
  const [selectedTokenToDisable, setSelectedTokenToDisable] = useState(null);

  const activeTokens = Object.entries(tokenStates).filter(([_, state]) => state.active).length;
  const totalTokens = mockMerchantApps.length;

  const handleToggleToken = (appId) => {
    const currentState = tokenStates[appId];
    if (currentState.active) {
      setSelectedTokenToDisable(appId);
    } else {
      setTokenStates(prev => ({
        ...prev,
        [appId]: { ...prev[appId], active: true }
      }));
    }
  };

  const confirmDisableToken = () => {
    if (selectedTokenToDisable) {
      setTokenStates(prev => ({
        ...prev,
        [selectedTokenToDisable]: { ...prev[selectedTokenToDisable], active: false }
      }));
      setSelectedTokenToDisable(null);
    }
  };

  const getAppById = (id) => mockMerchantApps.find(app => app.id === id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
              onClick={() => navigate('/cc-details')}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold">Manage Tokens</h1>
          </div>
          <div className="text-sm">
            {activeTokens}/{totalTokens} Active
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Security Info */}
        <Card className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950 border-teal-200 dark:border-teal-800">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-teal-600" />
            <div>
              <div className="font-semibold text-teal-800 dark:text-teal-200">
                Secure Token Management
              </div>
              <div className="text-sm text-teal-600 dark:text-teal-400">
                Control which apps can access your payment tokens
              </div>
            </div>
          </div>
        </Card>

        {/* Token Statistics */}
        <Card className="p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeTokens}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">{totalTokens - activeTokens}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Disabled Tokens</div>
            </div>
          </div>
        </Card>

        {/* Token List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Your Saved Cards
          </h2>
          {/* Show newly created tokens first */}
          {newlyCreatedTokens.length > 0 && (
            <div className="mb-4">
              <div className="text-sm text-green-400 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Recently added
              </div>
              {mockMerchantApps
                .filter(app => newlyCreatedTokens.includes(app.id))
                .map((app) => {
                  const tokenState = tokenStates[app.id];
                  const isActive = tokenState?.active;
                  const lastUsed = tokenState?.lastUsed;
                  
                  return (
                    <Card 
                      key={app.id} 
                      className="p-4 transition-all duration-200 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                            {app.icon}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                              {app.name}
                              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">New</span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {app.description}
                            </div>
                            <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                              Card saved today
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                            Active
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleToken(app.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <ToggleRight className="w-6 h-6" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          )}
          
          {/* Show other tokens */}
          {mockMerchantApps
            .filter(app => !newlyCreatedTokens.includes(app.id))
            .map((app) => {
              const tokenState = tokenStates[app.id];
              const isActive = tokenState?.active;
              const lastUsed = tokenState?.lastUsed;
              
              return (
                <Card 
                  key={app.id} 
                  className={`p-4 transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm' 
                      : 'bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center text-2xl shadow-sm ${
                        !isActive ? 'opacity-50' : ''
                      }`}>
                        {app.icon}
                      </div>
                      <div>
                        <div className={`font-semibold ${
                          isActive ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {app.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {app.description}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {isActive 
                            ? `Last used: ${lastUsed?.toLocaleDateString() || 'Never'}` 
                            : 'Card removed'
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isActive 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}>
                        {isActive ? 'Active' : 'Disabled'}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleToken(app.id)}
                        className={`p-1 ${
                          isActive 
                            ? 'text-green-600 hover:text-green-700' 
                            : 'text-gray-400 hover:text-gray-500'
                        }`}
                      >
                        {isActive ? (
                          <ToggleRight className="w-6 h-6" />
                        ) : (
                          <ToggleLeft className="w-6 h-6" />
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>

        {/* Add New Tokens Button */}
        <Button
          onClick={() => navigate('/merchant-apps')}
          variant="outline"
          className="w-full border-teal-500 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950 font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Add More Tokens
        </Button>

        {/* Confirmation Dialog */}
        <AlertDialog open={!!selectedTokenToDisable} onOpenChange={() => setSelectedTokenToDisable(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Disable Token
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to disable the token for{' '}
                <span className="font-semibold">
                  {selectedTokenToDisable && getAppById(selectedTokenToDisable)?.name}
                </span>? 
                This app will no longer be able to process payments using your saved card.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedTokenToDisable(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDisableToken}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Disable Token
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ManageTokens;