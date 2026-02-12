
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PetState, PetStats } from '../types';
import { PET_ANIMATIONS } from '../constants';
import { ContextMenu } from './ContextMenu';
import { setIgnoreMouseEvents } from '../utils';

interface DesktopPetProps {
  onOpenSettings: () => void;
  onExit: () => void;
  isModalOpen: boolean;
}

export const DesktopPet: React.FC<DesktopPetProps> = ({ onOpenSettings, onExit, isModalOpen }) => {
  const [state, setState] = useState<PetState>(PetState.IDLE);
  const [frameIndex, setFrameIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState<PetStats>({ hunger: 80, happiness: 70, energy: 90 });

  const isDraggingRef = useRef(false);
  
  const savedPos = JSON.parse(localStorage.getItem('pet-pos') || 'null');
  const initialPos = savedPos || { x: window.innerWidth - 300, y: window.innerHeight - 350 };

  // 动画循环
  useEffect(() => {
    const config = PET_ANIMATIONS[state];
    const timer = setInterval(() => {
      setFrameIndex((p) => (p + 1) % config.frames.length);
    }, 1000 / config.fps);
    return () => clearInterval(timer);
  }, [state]);

  // 属性自然衰减
  useEffect(() => {
    const statsTimer = setInterval(() => {
      setStats(prev => ({
        hunger: Math.max(0, prev.hunger - 0.2),
        happiness: Math.max(0, prev.happiness - 0.1),
        energy: Math.max(0, prev.energy - 0.1),
      }));
    }, 10000);
    return () => clearInterval(statsTimer);
  }, []);

  // 点击互动：随机触发开心或惊讶动画，随后返回 IDLE
  const handleInteract = () => {
    if (state !== PetState.IDLE) return;
    
    const randomMood = Math.random() > 0.5 ? PetState.HAPPY : PetState.SURPRISE;
    setState(randomMood);
    
    // 增加一点心情
    setStats(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 5) }));

    // 2秒后恢复发呆
    setTimeout(() => {
      setState(PetState.IDLE);
    }, 2000);
  };

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        initial={initialPos}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDragEnd={(e, info) => {
          // Delay clearing drag state to avoid triggering onClick
          setTimeout(() => { isDraggingRef.current = false; }, 100);
          localStorage.setItem('pet-pos', JSON.stringify({ x: info.point.x - 90, y: info.point.y - 90 }));
        }}
        onMouseEnter={() => setIgnoreMouseEvents(false)}
        onMouseLeave={() => {
          // 如果有模态框打开（比如设置），鼠标移出宠物时不应该恢复穿透，否则无法点击模态框
          if (!isModalOpen && !showMenu) {
            setIgnoreMouseEvents(true);
          }
        }}
        className="fixed z-50 group flex flex-col items-center select-none"
        onContextMenu={(e) => { 
          e.preventDefault(); 
          setMenuPos({ x: e.clientX, y: e.clientY }); 
          setShowMenu(true); 
          setIgnoreMouseEvents(false); // Ensure menu is clickable
        }}
        style={{ width: 180, cursor: 'grab' }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* 状态栏 (鼠标悬停显示) */}
        <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-1 w-24 pointer-events-none">
          <StatBar label="饱食" value={stats.hunger} color="bg-orange-400" />
          <StatBar label="心情" value={stats.happiness} color="bg-pink-400" />
          <StatBar label="精力" value={stats.energy} color="bg-blue-400" />
        </div>

        {/* 宠物本体 */}
        <div 
          className="relative w-full aspect-square flex items-center justify-center" 
          onClick={(e) => {
             e.stopPropagation();
             // 防止拖拽结束时触发点击
             if (!isDraggingRef.current) {
               handleInteract();
             }
          }}
        >
          {/* 阴影 */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} 
            transition={{ duration: 3, repeat: Infinity }} 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full blur-md" 
          />
          {/* 图像 */}
          <img 
            src={PET_ANIMATIONS[state].frames[frameIndex]} 
            alt="Pet" 
            className="w-full h-full object-contain pointer-events-none drop-shadow-lg" 
            draggable={false}
          />
        </div>
      </motion.div>

      {showMenu && (
        <div 
          onMouseEnter={() => setIgnoreMouseEvents(false)}
          onMouseLeave={() => {
             // 如果从菜单移到了设置窗口（showMenu变false前），这一步由 App.tsx 控制
             // 仅当没有模态框时才恢复穿透
             if (!isModalOpen) setIgnoreMouseEvents(true);
          }}
        >
          <ContextMenu 
            x={menuPos.x} y={menuPos.y} 
            onClose={() => {
              setShowMenu(false);
              // 菜单关闭时，如果没有打开模态框，且鼠标可能不在宠物上，尝试恢复穿透
              // 注意：如果鼠标还在宠物上，宠物的 onMouseEnter 会保持它为 false，所以这里设为 true 是安全的默认值
              if (!isModalOpen) setIgnoreMouseEvents(true);
            }} 
            onOpenSettings={onOpenSettings} 
            onExit={onExit}
            currentMood={state} 
            setMood={setState} 
            onFeed={() => { 
              setStats(s => ({...s, hunger: Math.min(100, s.hunger+20)})); 
              setState(PetState.HAPPY); 
              setTimeout(() => setState(PetState.IDLE), 2000);
            }}
          />
        </div>
      )}
    </>
  );
};

const StatBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="w-full">
    <div className="flex justify-between text-[7px] font-bold text-slate-500 mb-0.5 px-1 uppercase"><span>{label}</span><span>{Math.round(value)}%</span></div>
    <div className="h-1 bg-slate-200 rounded-full overflow-hidden border border-white/20"><motion.div animate={{ width: `${value}%` }} className={`h-full ${color}`} /></div>
  </div>
);
