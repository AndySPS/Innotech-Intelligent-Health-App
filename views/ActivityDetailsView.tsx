
import React, { useState } from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';

interface ActivityDetailsViewProps {
  metric: any;
}

export const ActivityDetailsView: React.FC<ActivityDetailsViewProps> = ({ metric }) => {
  const { typography, shape } = useM3Theme();
  const [filter, setFilter] = useState('Weekly');

  return (
    <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-8 duration-300">
      <div className={`p-dp-24 bg-m3-surfaceContainerHighest ${shape.extraLarge} text-center shadow-sm`}>
        <p className={`${typography.label.large} text-m3-onSurfaceVariant`}>Current Value</p>
        <h3 className={typography.display.medium}>{metric.value} <span className={typography.title.medium}>{metric.unit}</span></h3>
      </div>

      <div className="flex bg-m3-surfaceContainerHigh p-1 rounded-m3-full self-center shadow-inner">
        {['Daily', 'Weekly', 'Monthly'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-dp-16 py-dp-8 rounded-m3-full ${typography.label.medium} transition-all ${filter === f ? 'bg-m3-primary text-m3-onPrimary shadow-md' : 'text-m3-onSurfaceVariant hover:bg-m3-surfaceVariant'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="h-48 flex items-end justify-between gap-2 px-2">
        {metric.data.map((val: number, i: number) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-m3-primary/20 rounded-t-m3-xs relative group transition-all duration-500" style={{ height: `${(val / Math.max(...metric.data)) * 100}%` }}>
               <div className="absolute inset-0 bg-m3-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-m3-xs shadow-sm"></div>
            </div>
            <span className={typography.label.small}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
          </div>
        ))}
      </div>

      <section className={`p-dp-16 bg-m3-primaryContainer/30 ${shape.large} border border-m3-primary/10`}>
        <div className="flex items-center gap-2 mb-2">
          <M3Icon name={IconName.Info} size={18} className="text-m3-primary" />
          <h4 className={`${typography.title.small} text-m3-primary uppercase tracking-tight`}>AI Health Insight</h4>
        </div>
        <p className={`${typography.body.medium} text-m3-onSurface`}>{metric.insight}</p>
      </section>
    </div>
  );
};
