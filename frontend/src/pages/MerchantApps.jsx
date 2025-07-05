import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, ChevronRight, Info } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import MerchantAppCard from '../components/MerchantAppCard';
import { mockMerchantApps, mockSecurityInfo } from '../data/mock';

const MerchantApps = () => {
  const navigate = useNavigate();
  const [selectedApps, setSelectedApps] = useState([]);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);

  const handleAppSelect = (appId) => {
    setSelectedApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const handlePushTokens = () => {
    if (selectedApps.length > 0) {
      navigate('/loading-transition', { state: { selectedApps } });
    }
  };

  const handleSelectAll = () => {
    if (selectedApps.length === mockMerchantApps.length) {
      setSelectedApps([]);
    } else {
      setSelectedApps(mockMerchantApps.map(app => app.id));
    }
  };

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
            <h1 className="text-lg font-semibold">Select Apps</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20"
            onClick={handleSelectAll}
          >
            {selectedApps.length === mockMerchantApps.length ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Security Info Bar */}
        <Card className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950 border-teal-200 dark:border-teal-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-teal-600" />
              <div>
                <div className="font-semibold text-teal-800 dark:text-teal-200">
                  Secure Token Storage
                </div>
                <div className="text-sm text-teal-600 dark:text-teal-400">
                  Card details saved as per RBI guidelines
                </div>
              </div>
            </div>
            <Dialog open={showSecurityDialog} onOpenChange={setShowSecurityDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-600" />
                    {mockSecurityInfo.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {mockSecurityInfo.description}
                  </p>
                  <ul className="space-y-2">
                    {mockSecurityInfo.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center gap-6 pt-4 border-t">
                    {mockSecurityInfo.logos.map((logo, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-8 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">
                          {logo.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* Selected Apps Counter */}
        {selectedApps.length > 0 && (
          <Card className="p-4 bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-teal-600" />
                <span className="text-teal-800 dark:text-teal-200 font-medium">
                  {selectedApps.length} app{selectedApps.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="text-sm text-teal-600 dark:text-teal-400">
                Tokens will be created securely
              </div>
            </div>
          </Card>
        )}

        {/* Merchant Apps List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white mb-4">
            Choose apps to push your card tokens
          </h2>
          {mockMerchantApps.map((app) => (
            <div key={app.id} className="transform hover:scale-105 transition-transform duration-200">
              <MerchantAppCard
                app={app}
                isSelected={selectedApps.includes(app.id)}
                onSelect={handleAppSelect}
              />
            </div>
          ))}
        </div>

        {/* Push Tokens Button */}
        <div className="sticky bottom-4 pt-6">
          <Button
            onClick={handlePushTokens}
            disabled={selectedApps.length === 0}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {selectedApps.length === 0 ? 'Select apps to continue' : `Work Magic (${selectedApps.length} apps)`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MerchantApps;