import React from 'react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';

const MerchantAppCard = ({ app, isSelected, onSelect }) => {
  return (
    <Card className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
      isSelected ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-950' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
    }`} onClick={() => onSelect(app.id)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center text-2xl shadow-sm">
            {app.icon}
          </div>
          <div>
            <div className="font-semibold text-gray-800 dark:text-gray-200">
              {app.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {app.description}
            </div>
            <div className="text-xs text-teal-600 dark:text-teal-400 mt-1">
              {app.category}
            </div>
          </div>
        </div>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(app.id)}
          className="w-5 h-5"
        />
      </div>
    </Card>
  );
};

export default MerchantAppCard;