
import React, { useState } from 'react';
import { M3Icon, IconName } from '../Icons';
import { useM3Theme } from '../../theme/ThemeConfig';

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
  onNavigate?: (index: number) => void;
  hideNav?: boolean;
  activeTab?: number;
  showBack?: boolean;
  onBack?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  title, 
  children, 
  onNavigate, 
  hideNav = false, 
  activeTab: externalActiveTab,
  showBack = false,
  onBack
}) => {
  const { typography, shape } = useM3Theme();
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeTab = externalActiveTab !== undefined && externalActiveTab !== -1 ? externalActiveTab : internalActiveTab;

  const handleTabClick = (idx: number) => {
    setInternalActiveTab(idx);
    setIsDrawerOpen(false);
    if (onNavigate) onNavigate(idx);
  };

  const mainNavItems = [
    { icon: IconName.Home, label: 'Health Dashboard', idx: 0 },
    { icon: IconName.Layers, label: 'Lab Reports', idx: 1 },
    { icon: IconName.MapPin, label: 'Clinic Discovery', idx: 2 },
    { icon: IconName.Zap, label: 'Health Optimizer', idx: 3 },
  ];

  const secondaryNavItems = [
    { icon: IconName.Activity, label: 'Sensor Feed (Live)', idx: -1 },
    { icon: IconName.Calendar, label: 'Appointments', idx: -1 },
  ];

  const supportItems = [
    { icon: IconName.Info, label: 'About Innotech', idx: -1 },
    { icon: IconName.Warning, label: 'Help & Support', idx: -1 },
  ];

  return (
    <div className="relative flex flex-col h-screen w-full bg-m3-background text-m3-onBackground overflow-hidden">
      {/* Drawer Scrim */}
      {isDrawerOpen && (
        <div 
          className="absolute inset-0 bg-black/40 z-40 transition-opacity duration-300 animate-in fade-in"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Navigation Drawer - M3 Modal Standard Refined Spacing */}
      <aside 
        className={`
          absolute top-0 left-0 h-full w-[320px] bg-m3-surfaceContainerLow z-50 
          ${shape.extraLarge} rounded-l-none shadow-2xl transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto scrollbar-hide pt-dp-24">
          <div className="flex flex-col px-dp-12 pb-dp-32">
            {/* Main Navigation Section */}
            <div className="mb-dp-16">
              <div className="flex flex-col gap-dp-8">
                {mainNavItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleTabClick(item.idx)}
                    className={`
                      flex items-center gap-dp-16 h-dp-64 px-dp-16 rounded-m3-full transition-all active:scale-[0.97]
                      ${activeTab === item.idx ? 'bg-m3-secondaryContainer text-m3-onSecondaryContainer' : 'hover:bg-m3-surfaceVariant text-m3-onSurface'}
                    `}
                  >
                    <div className={activeTab === item.idx ? 'text-m3-primary' : 'text-m3-onSurfaceVariant'}>
                      <M3Icon name={item.icon} size={24} />
                    </div>
                    <span className={`${typography.label.large} font-semibold`}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-m3-outline/10 my-dp-8 mx-dp-16" />
            
            {/* Insights & Tracking Section */}
            <div className="mb-dp-16">
              <p className={`${typography.label.medium} px-dp-16 py-dp-12 text-m3-onSurfaceVariant uppercase tracking-widest`}>Insights & Tracking</p>
              <div className="flex flex-col gap-dp-8">
                {secondaryNavItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => item.idx !== -1 && handleTabClick(item.idx)}
                    className={`
                      flex items-center gap-dp-16 h-dp-64 px-dp-16 rounded-m3-full text-m3-onSurface hover:bg-m3-surfaceVariant transition-all active:scale-[0.97]
                      ${item.idx === -1 ? 'opacity-60' : ''}
                    `}
                  >
                    <M3Icon name={item.icon} size={24} className="text-m3-onSurfaceVariant" />
                    <span className={`${typography.label.large} font-medium`}>{item.label}</span>
                    {item.idx === -1 && <span className="ml-auto text-[10px] bg-m3-surfaceContainerHighest px-2 py-0.5 rounded-full font-bold">Soon</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-m3-outline/10 my-dp-8 mx-dp-16" />

            {/* Support Section */}
            <div className="mt-dp-8 flex flex-col gap-dp-4">
              {supportItems.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-dp-16 h-dp-56 px-dp-16 rounded-m3-full text-m3-onSurfaceVariant hover:bg-m3-surfaceVariant transition-colors"
                >
                  <M3Icon name={item.icon} size={22} />
                  <span className={typography.body.medium}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Top App Bar */}
      <header className={`h-dp-64 px-dp-16 flex items-center justify-between bg-m3-surface z-10 ${hideNav && externalActiveTab === -1 && !showBack ? '' : 'shadow-sm'}`}>
        <div className="flex items-center gap-dp-16">
          {showBack ? (
            <button 
              onClick={onBack}
              className="w-12 h-12 flex items-center justify-center -ml-2 rounded-full hover:bg-m3-surfaceVariant transition-colors active:bg-m3-surfaceContainerHighest"
            >
              <M3Icon name={IconName.Back} className="text-m3-onSurface" />
            </button>
          ) : !hideNav ? (
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="w-12 h-12 flex items-center justify-center -ml-2 rounded-full hover:bg-m3-surfaceVariant transition-colors active:bg-m3-surfaceContainerHighest"
            >
              <M3Icon name={IconName.Menu} className="text-m3-onSurface" />
            </button>
          ) : null}
          <h1 className={`${typography.title.large} font-bold text-m3-onSurface`}>{title}</h1>
        </div>
        {!hideNav && (
          <div className="flex items-center gap-dp-4">
            <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-m3-surfaceVariant active:bg-m3-surfaceContainerHighest">
              <M3Icon name={IconName.Notification} size={22} />
            </button>
            <button 
              onClick={() => handleTabClick(4)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors active:bg-m3-surfaceContainerHighest ${activeTab === 4 ? 'bg-m3-secondaryContainer text-m3-onSecondaryContainer' : 'hover:bg-m3-surfaceVariant'}`}
            >
              <M3Icon name={IconName.Profile} size={22} />
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-dp-24 px-dp-16 pt-dp-16 scroll-smooth">
        <div className="max-w-md mx-auto h-full">
          {children}
        </div>
      </main>

      {/* Navigation Bar (Bottom Nav) */}
      {!hideNav && (
        <nav className="h-20 bg-m3-surfaceContainer flex items-center justify-around border-t border-m3-surfaceVariant/30 pb-safe shadow-lg animate-in slide-in-from-bottom-8 duration-300">
          {[
            { icon: IconName.Home, label: 'Home' },
            { icon: IconName.Layers, label: 'Reports' },
            { icon: IconName.MapPin, label: 'Clinics' },
            { icon: IconName.Zap, label: 'Optimizer' }
          ].map((item, idx) => (
            <button 
              key={item.label}
              onClick={() => handleTabClick(idx)}
              className="flex flex-col items-center justify-center flex-1 gap-1"
            >
              <div className={`
                px-5 py-1 rounded-m3-xl transition-all duration-200
                ${activeTab === idx ? 'bg-m3-secondaryContainer text-m3-onSecondaryContainer' : 'text-m3-onSurfaceVariant'}
              `}>
                <M3Icon name={item.icon} size={24} />
              </div>
              <span className={`${typography.label.medium} ${activeTab === idx ? 'text-m3-onSurface font-bold' : 'text-m3-onSurfaceVariant'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};
