import React from 'react';

export function QuickAccessItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full px-4 py-3 border border-gray-200 rounded-md hover:bg-green-50 transition"
      type="button"
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-600 text-white">
        {icon}
      </div>
      <span className="text-gray-700 font-medium">{label}</span>
    </button>
  );
}
