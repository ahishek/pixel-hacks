import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Clock, Sparkles, Shield, Zap } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { mockMerchantApps } from '../data/mock';

const LoadingTransition = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedApps = location.state?.selectedApps || [];
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedApps, setCompletedApps] = useState([]);

  const selectedMerchantApps = mockMerchantApps.filter(app => selectedApps.includes(app.id));

  const steps = [
    { id: 1, title: 'Initializing secure connection', icon: Shield, color: 'text-blue-500' },
    { id: 2, title: 'Generating secure tokens', icon: Sparkles, color: 'text-purple-500' },
    { id: 3, title: 'Provisioning to selected apps', icon: Zap, color: 'text-teal-500' },
    { id: 4, title: 'Finalizing setup', icon: CheckCircle, color: 'text-green-500' }
  ];

  useEffect(() => {
    if (selectedApps.length === 0) {
      navigate('/merchant-apps');
      return;
    }

    const totalTime = 6000; // 6 seconds total
    const stepTime = totalTime / steps.length;

    let stepIndex = 0;
    let currentProgress = 0;

    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        
        if (stepIndex === 2) { // Provisioning step
          // Complete all apps for this step
          setCompletedApps(selectedMerchantApps.map(app => app.id));
          stepIndex++;
          currentProgress = ((stepIndex + 1) / steps.length) * 100;
        } else {
          stepIndex++;
          currentProgress = (stepIndex / steps.length) * 100;
        }
        
        setProgress(currentProgress);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/success-state', { state: { selectedApps } });
        }, 500);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [selectedApps, navigate, selectedMerchantApps, steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <div className="text-center space-y-8">
          {/* Animated Logo */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
              <Sparkles className="w-10 h-10 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mx-auto animate-ping opacity-20"></div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Creating Magic ✨
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Setting up secure tokens for your selected apps
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(progress)}% complete
            </div>
          </div>

          {/* Current Step */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-teal-50 to-purple-50 dark:from-teal-950 dark:to-purple-950 scale-105' 
                      : isCompleted 
                      ? 'bg-green-50 dark:bg-green-950' 
                      : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    isActive ? step.color : isCompleted ? 'text-green-500' : 'text-gray-400'
                  } ${isActive ? 'animate-pulse' : ''}`} />
                  <span className={`text-sm ${
                    isActive ? 'font-semibold text-gray-800 dark:text-gray-200' : 
                    isCompleted ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {isCompleted && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                  {isActive && <Clock className="w-4 h-4 text-gray-400 ml-auto animate-spin" />}
                </div>
              );
            })}
          </div>

          {/* App Progress */}
          {currentStep === 2 && (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Provisioning tokens to apps:
              </div>
              <div className="space-y-2">
                {selectedMerchantApps.map((app) => (
                  <div 
                    key={app.id}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                      completedApps.includes(app.id) 
                        ? 'bg-green-50 dark:bg-green-950' 
                        : 'bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <div className="text-lg">{app.icon}</div>
                    <span className={`text-sm ${
                      completedApps.includes(app.id) 
                        ? 'text-green-700 dark:text-green-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {app.name}
                    </span>
                    {completedApps.includes(app.id) && (
                      <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LoadingTransition;