
import React from 'react';
import { useM3Theme } from '../theme/ThemeConfig';

interface AuthViewProps {
  onLogin: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const { typography, shape } = useM3Theme();
  const logoUrl = "https://image.makewebeasy.net/makeweb/m_1920x0/x5zVUyMtL/Logo/Logo_innotech.jpg?v=202405291424";

  return (
    <div className="flex flex-col gap-dp-32 pt-dp-48 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-dp-16 items-center text-center">
        <div className={`w-32 h-32 bg-white ${shape.extraLarge} shadow-sm overflow-hidden flex items-center justify-center p-dp-12`}>
          <img src={logoUrl} alt="Innotech Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className={typography.headline.medium}>Innotech Health</h1>
          <p className={`${typography.body.large} text-m3-onSurfaceVariant`}>Intelligent Health OS</p>
        </div>
      </div>
      <div className="flex flex-col gap-dp-16">
        <div className="flex flex-col gap-dp-4">
          <label className={`${typography.label.medium} ml-4 text-m3-onSurfaceVariant`}>Phone Number</label>
          <div className={`h-dp-48 px-dp-16 flex items-center gap-dp-12 bg-m3-surfaceContainerHighest ${shape.medium} border-b-2 border-m3-primary`}>
            <span className={`${typography.body.large} font-medium`}>+66</span>
            <input type="tel" placeholder="081 234 5678" className="bg-transparent flex-1 outline-none h-full text-m3-onSurface" />
          </div>
        </div>
        <button onClick={onLogin} className={`h-dp-48 bg-m3-primary text-m3-onPrimary ${shape.full} ${typography.label.large} shadow-md active:scale-95 transition-all uppercase tracking-wide`}>
          SEND OTP
        </button>
      </div>
    </div>
  );
};
