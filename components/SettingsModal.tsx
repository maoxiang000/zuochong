
import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-300 animate-in zoom-in-95 duration-200">
        <div className="bg-slate-200/50 px-4 py-3 flex items-center justify-between border-b border-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-xs font-bold text-slate-700">关于桌面小猫</span>
          </div>
          <button onClick={onClose} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center shadow-inner relative overflow-hidden">
               <img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Lucky&size=256" alt="Icon" className="w-14 h-14 drop-shadow-md z-10" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Mochi Lite</h2>
              <p className="text-xs font-bold text-slate-500 bg-slate-100 inline-block px-2 py-0.5 rounded-full mt-1">
                v1.0.0 基础版
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2 shadow-sm">
             <p>👋 <b>你好！我是 Mochi。</b></p>
             <p>我是一只安静的桌面像素猫。我会在这里陪着你工作和学习。</p>
             <ul className="list-disc list-inside mt-2 text-slate-500">
               <li>拖拽我可以移动位置</li>
               <li>点击我会做鬼脸</li>
               <li>右键可以投喂我</li>
             </ul>
          </div>

          <button onClick={onClose} className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95">
            继续陪伴
          </button>
        </div>
      </div>
    </div>
  );
};
