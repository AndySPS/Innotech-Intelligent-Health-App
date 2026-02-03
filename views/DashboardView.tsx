
import React from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';
import { Badge } from '../components/ui/Badge';
import { ActivityCard } from '../components/features/ActivityCard';

interface DashboardViewProps {
  metrics: any[];
  onSelectActivity: (id: string) => void;
  onStartAI?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ metrics, onSelectActivity, onStartAI }) => {
  const { typography, shape } = useM3Theme();
  
  const healthScores = [
    { label: 'Metabolic', score: 82 },
    { label: 'Cardio', score: 75 },
    { label: 'Sleep', score: 64 },
    { label: 'Lifestyle', score: 90 },
  ];

  return (
    <div className="flex flex-col gap-dp-24 animate-in fade-in duration-500">
      <div className="flex flex-col">
        <h2 className={typography.headline.small}>Hello, Alex</h2>
        <p className={`${typography.body.medium} text-m3-onSurfaceVariant`}>Intelligent Health Monitoring</p>
      </div>

      <div className={`p-dp-24 bg-m3-primaryContainer text-m3-onPrimaryContainer ${shape.container} shadow-sm relative overflow-hidden`}>
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-m3-primary/10 rounded-m3-full blur-2xl"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className={typography.label.large}>Overall Health Score</span>
            <h3 className={typography.display.medium}>78</h3>
          </div>
          <button className="bg-white/20 p-2 rounded-m3-md backdrop-blur-sm active:scale-95 transition-transform shadow-inner text-m3-onPrimaryContainer">
             <M3Icon name={IconName.Info} size={20} />
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 relative z-10">
          <Badge color="bg-green-600">Improving</Badge>
          <p className={typography.body.small}>Peaks in metabolic activity detected.</p>
        </div>
      </div>

      <section className="flex flex-col gap-dp-12">
        <h3 className={typography.title.large}>Upcoming Appointment</h3>
        <div className={`p-dp-16 bg-white border border-m3-outline/10 ${shape.card} flex justify-between items-center shadow-sm active:bg-m3-surfaceContainerLow transition-colors`}>
          <div className="flex items-center gap-dp-16">
            <div className="w-12 h-12 bg-m3-primaryContainer rounded-m3-md flex flex-col items-center justify-center">
              <span className={typography.label.small}>MAY</span>
              <span className={typography.title.large}>22</span>
            </div>
            <div>
              <p className={typography.title.medium}>Innotech Central</p>
              <p className={`${typography.body.small} text-m3-onSurfaceVariant`}>Dr. Sarah Wilson • 10:30 AM</p>
            </div>
          </div>
          <M3Icon name={IconName.Calendar} size={20} className="text-m3-primary" />
        </div>
      </section>

      <section className="flex flex-col gap-dp-12">
        <h3 className={typography.title.large}>Health Categories</h3>
        <div className="flex gap-dp-8 overflow-x-auto pb-dp-8 -mx-dp-16 px-dp-16 scrollbar-hide">
          {healthScores.map(item => (
            <div key={item.label} className={`min-w-[100px] p-dp-12 bg-m3-surfaceContainerHigh ${shape.card} flex flex-col items-center gap-1 shrink-0 shadow-sm border border-m3-outline/5`}>
              <span className={typography.label.small}>{item.label}</span>
              <span className={typography.title.large}>{item.score}</span>
              <div className="h-1 w-full rounded-m3-full bg-m3-outline/10 mt-1">
                 <div className="h-full bg-m3-primary rounded-m3-full" style={{ width: `${item.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-dp-12">
        <div className="flex justify-between items-center">
          <h3 className={typography.title.large}>Activity Tracker</h3>
          <button className={`${typography.label.large} text-m3-primary`} onClick={() => onSelectActivity('steps')}>Insights</button>
        </div>
        <div className="grid grid-cols-2 gap-dp-8">
          {metrics.map(m => (
            <ActivityCard 
              key={m.id}
              icon={m.icon}
              label={m.label}
              value={m.value}
              color={m.color}
              onClick={() => onSelectActivity(m.id)}
            />
          ))}
        </div>
      </section>

      <div className="fixed bottom-24 right-6 flex flex-col gap-dp-12">
        <button 
          onClick={window.dispatchEvent.bind(window, new CustomEvent('nav-ai'))}
          className={`w-14 h-14 bg-m3-secondaryContainer text-m3-onSecondaryContainer rounded-m3-xl shadow-xl flex items-center justify-center active:scale-90 transition-all hover:shadow-2xl`}
        >
          <M3Icon name={IconName.Chat} size={28} />
        </button>
      </div>
    </div>
  );
};
