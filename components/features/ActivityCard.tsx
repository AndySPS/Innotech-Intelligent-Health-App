
import React from 'react';
import { M3Icon, IconName } from '../Icons';
import { useM3Theme } from '../../theme/ThemeConfig';

interface ActivityCardProps {
  icon: IconName;
  label: string;
  value: string;
  color: string;
  onClick: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ icon, label, value, color, onClick }) => {
  const { typography, shape } = useM3Theme();
  return (
    <button 
      onClick={onClick}
      className={`p-dp-16 bg-m3-surfaceContainerLow ${shape.card} flex flex-col items-center gap-2 hover:bg-m3-surfaceContainerHigh transition-all active:scale-[0.98] border border-m3-outline/5 shadow-sm`}
    >
      <div className={`w-10 h-10 rounded-m3-full ${color} flex items-center justify-center shadow-sm`}>
        <M3Icon name={icon} size={20} className="text-m3-onSurface" />
      </div>
      <div className="text-center">
        <p className={typography.label.medium}>{label}</p>
        <p className={typography.title.medium}>{value}</p>
      </div>
    </button>
  );
};
