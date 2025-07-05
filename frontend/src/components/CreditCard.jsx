import React, { useState } from 'react';
import { Eye, EyeOff, Wifi } from 'lucide-react';
import { Card } from './ui/card';

const CreditCardComponent = ({ cardData }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showSensitive, setShowSensitive] = useState(false);

  const maskCardNumber = (number) => {
    return number.replace(/\d(?=\d{4})/g, '*');
  };

  const formatCardNumber = (number) => {
    return number.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <Card className="relative w-full max-w-sm mx-auto bg-gradient-to-br from-teal-400 to-teal-600 text-white p-6 rounded-2xl shadow-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-300/20 to-transparent"></div>
      
      {/* Card Content */}
      <div className="relative z-10">
        {/* Bank Logo and Card Type */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white font-bold text-lg">PIXEL PLAY</div>
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            <span className="text-sm font-medium">VISA</span>
          </div>
        </div>

        {/* Card Number */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-2xl font-mono tracking-wider">
              {showDetails ? formatCardNumber(cardData.cardNumber) : maskCardNumber(cardData.cardNumber)}
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Card Holder Name */}
        <div className="mb-4">
          <div className="text-sm opacity-80 mb-1">CARD HOLDER</div>
          <div className="font-semibold">{cardData.cardHolderName}</div>
        </div>

        {/* Expiry and CVV */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm opacity-80 mb-1">EXPIRES</div>
            <div className="font-semibold">
              {showDetails ? '**/**' : (showSensitive ? cardData.expiryDate : '**/**')}
            </div>
          </div>
          <div>
            <div className="text-sm opacity-80 mb-1">CVV</div>
            <div className="font-semibold">
              {showDetails ? '***' : (showSensitive ? cardData.cvv : '***')}
            </div>
          </div>
          <button
            onClick={() => setShowSensitive(!showSensitive)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            {showSensitive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* RuPay Logo */}
      <div className="absolute bottom-4 right-4 opacity-80">
        <span className="text-sm font-bold">RuPay</span>
      </div>
    </Card>
  );
};

export default CreditCard;