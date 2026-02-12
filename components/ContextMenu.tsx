
import React, { useEffect, useRef } from 'react';
import { PetState } from '../types';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOpenSettings: () => void;
  onExit: () => void;
  currentMood?: PetState;
  setMood?: (m: PetState) => void;
  onFeed?: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ 
  x, y, onClose, onOpenSettings, onExit, currentMood, setMood, onFeed 
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const adjustedX = Math.min(x, window.innerWidth - 180);
  const adjustedY = Math.min(y, window.innerHeight - 300);

  const MoodItem = ({ mood, label, icon }: { mood: PetState, label: string, icon: string }) => (
    <button 
      onClick={() => { setMood?.(mood); onClose(); }}
      className={`w-full text-left px-3 py-1.5 hover:bg-pink-50 flex items-center justify-between text-xs transition-colors ${currentMood === mood ? 'text-pink-600 font-bold bg-pink-50/50' : 'text-slate-600'}`}
    >
      <span>{label}</span>
      <span>{icon}</span>
    </button>
  );

  return (
    <div 
      ref={menuRef}
      className="fixed z-[100] w-44 bg-white/95 backdrop-blur-xl shadow-2xl rounded-xl border border-slate-200 py-2 font-sans overflow-hidden animate-in fade-in zoom-in duration-100"
      style={{ left: adjustedX, top: adjustedY }}
    >
      <div className="px-3 py-1 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">互动</div>
      
      <button 
        onClick={() => { onFeed?.(); onClose(); }}
        className="w-full text-left px-3 py-2 hover:bg-orange-50 text-orange-600 text-xs flex items-center gap-2 transition-colors"
      >
        <span className="text-base">🍪</span>
        给点好吃的
      </button>

      <div className="h-[1px] bg-slate-100 my-2 mx-2" />
      
      <div className="px-3 py-1 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">心情切换</div>
      <MoodItem mood={PetState.IDLE} label="乖巧待命" icon="😴" />
      <MoodItem mood={PetState.HAPPY} label="开心喵喵" icon="🥰" />
      <MoodItem mood={PetState.SURPRISE} label="呆呆惊讶" icon="😯" />
      <MoodItem mood={PetState.ANGRY} label="傲娇生气" icon="💢" />
      
      <div className="h-[1px] bg-slate-100 my-2 mx-2" />
      
      <button 
        onClick={() => { onOpenSettings(); onClose(); }}
        className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 text-sm flex items-center gap-2 transition-colors"
      >
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        设置中心
      </button>
      
      <button 
        onClick={() => { onExit(); onClose(); }}
        className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 text-sm flex items-center gap-2 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        退出程序
      </button>
    </div>
  );
};
