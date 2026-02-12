
import React, { useState, useEffect } from 'react';

interface TaskbarProps {
  onStartClick: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ onStartClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-slate-900/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-2 z-[90]">
      <div className="flex items-center gap-1">
        <button 
          onClick={onStartClick}
          className="p-2 hover:bg-white/10 rounded transition flex items-center justify-center"
        >
          <div className="grid grid-cols-2 gap-[1px]">
            <div className="w-2.5 h-2.5 bg-blue-400"></div>
            <div className="w-2.5 h-2.5 bg-blue-400"></div>
            <div className="w-2.5 h-2.5 bg-blue-400"></div>
            <div className="w-2.5 h-2.5 bg-blue-400"></div>
          </div>
        </button>
        
        {/* Active Apps */}
        <div className="h-10 px-3 bg-white/5 border-b-2 border-blue-400 flex items-center gap-2 rounded-t-sm">
          <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-sm"></div>
          <span className="text-white text-xs font-medium">桌面宠物</span>
        </div>
      </div>

      <div className="flex items-center gap-4 px-3 text-white text-xs font-medium">
        <div className="flex flex-col items-end">
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{time.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
        </div>
        <div className="w-px h-6 bg-white/10" />
        <button className="p-1 hover:bg-white/10 rounded">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
