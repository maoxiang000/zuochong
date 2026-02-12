
import React, { useState, useEffect } from 'react';
import { DesktopPet } from './components/DesktopPet';
import { Taskbar } from './components/Taskbar';
import { SettingsModal } from './components/SettingsModal';
import { setIgnoreMouseEvents } from './utils';

const App: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [isExited, setIsExited] = useState(false);
  
  // 检测是否为“透明模式”（桌面端 Electron 运行）
  const [isTransparentMode, setIsTransparentMode] = useState(false);

  useEffect(() => {
    if (window.location.hash.includes('transparent')) {
      setIsTransparentMode(true);
    }
  }, []);

  // 当设置窗口打开时，强制允许鼠标捕获（禁止穿透），以便用户点击关闭按钮
  useEffect(() => {
    if (isTransparentMode) {
      if (showSettings) {
        setIgnoreMouseEvents(false);
      } else {
        // 设置关闭时，默认恢复穿透（除非鼠标在宠物上，这由 DesktopPet 组件处理）
        // 这里给一个延时或者直接设为 true，依靠 DesktopPet 的 mouseEnter 拉回 false
        setIgnoreMouseEvents(true);
      }
    }
  }, [showSettings, isTransparentMode]);

  const desktopWallpaper = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540";

  if (isExited) {
    if (isTransparentMode) {
       // 如果是桌面端，退出时直接关闭窗口（这里用简单的文字代替，实际可调用 window.close()）
       return null; 
    }
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">程序已退出</h1>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded transition"
          >
            重新启动程序
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-screen h-screen overflow-hidden select-none ${isTransparentMode ? '' : 'bg-cover bg-center'}`}
      style={{ 
        backgroundImage: isTransparentMode ? 'none' : `url(${desktopWallpaper})`,
        pointerEvents: isTransparentMode ? 'none' : 'auto' // 透明模式下，背景不响应点击（穿透）
      }}
    >
      {/* 仅在网页模拟模式下显示桌面图标和任务栏 */}
      {!isTransparentMode && (
        <>
          <div className="absolute inset-0 z-0">
            <div className="p-8 grid grid-cols-1 gap-4 w-24">
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-12 h-12 bg-blue-500/80 rounded flex items-center justify-center shadow-lg group-hover:bg-blue-400">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <span className="text-white text-xs mt-1 drop-shadow-md font-medium">我的文档</span>
              </div>
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-12 h-12 bg-green-500/80 rounded flex items-center justify-center shadow-lg group-hover:bg-green-400">
                   <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="text-white text-xs mt-1 drop-shadow-md font-medium">回收站</span>
              </div>
            </div>
          </div>
          <Taskbar onStartClick={() => setShowSettings(true)} />
        </>
      )}

      {/* 核心宠物组件：增加 pointer-events-auto 以确保在透明背景下仍可交互 */}
      <div className="pointer-events-auto">
        <DesktopPet 
          onOpenSettings={() => setShowSettings(true)}
          onExit={() => setIsExited(true)}
          isModalOpen={showSettings}
        />
      </div>

      {/* 设置弹窗：也需要响应点击 */}
      <div className="pointer-events-auto">
        <SettingsModal 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
        />
      </div>
    </div>
  );
};

export default App;
