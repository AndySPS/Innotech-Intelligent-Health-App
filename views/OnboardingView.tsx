
import React, { useState } from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';

interface OnboardingViewProps {
  onFinish: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onFinish }) => {
  const { typography, shape } = useM3Theme();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleToggleSelection = (val: string) => {
    setSelections(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const nextStep = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else onFinish();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch(step) {
      case 0:
        return (
          <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className={typography.headline.small}>Let's build your Metabolic Signature</h2>
              <p className={`${typography.body.medium} text-m3-onSurfaceVariant mt-2`}>This helps us personalize your health journey.</p>
            </div>
            <div className="flex flex-col gap-dp-16">
              <div className="flex flex-col gap-1">
                <label className={typography.label.medium}>Age</label>
                <input type="number" placeholder="25" className={`h-dp-48 px-dp-16 bg-m3-surfaceContainerHighest ${shape.medium} outline-none border-b-2 border-m3-outline/30 focus:border-m3-primary transition-colors`} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={typography.label.medium}>Gender</label>
                <select className={`h-dp-48 px-dp-16 bg-m3-surfaceContainerHighest ${shape.medium} outline-none border-b-2 border-m3-outline/30`}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={typography.label.medium}>Height (cm)</label>
                <input type="number" placeholder="175" className={`h-dp-48 px-dp-16 bg-m3-surfaceContainerHighest ${shape.medium} outline-none border-b-2 border-m3-outline/30`} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={typography.label.medium}>Weight (kg)</label>
                <input type="number" placeholder="70" className={`h-dp-48 px-dp-16 bg-m3-surfaceContainerHighest ${shape.medium} outline-none border-b-2 border-m3-outline/30`} />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className={typography.headline.small}>Metabolic History</h2>
              <p className={`${typography.body.medium} text-m3-onSurfaceVariant mt-2`}>Select any conditions that apply to you.</p>
            </div>
            <div className="grid grid-cols-1 gap-dp-8">
              {['Diabetes (Type 1 or 2)', 'Hypertension', 'High Cholesterol', 'Fatty Liver', 'Thyroid Disorder', 'None of these'].map(condition => (
                <button 
                  key={condition}
                  onClick={() => handleToggleSelection(condition)}
                  className={`p-dp-16 border-2 rounded-m3-md text-left flex items-center justify-between transition-all ${selections.includes(condition) ? 'bg-m3-primaryContainer border-m3-primary text-m3-onPrimaryContainer' : 'bg-m3-surface border-m3-outline/10 text-m3-onSurface'}`}
                >
                  <span className={typography.body.large}>{condition}</span>
                  {selections.includes(condition) && <M3Icon name={IconName.Done} size={20} />}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className={typography.headline.small}>Lifestyle & Habits</h2>
              <p className={`${typography.body.medium} text-m3-onSurfaceVariant mt-2`}>How would you describe your daily activity?</p>
            </div>
            <div className="flex flex-col gap-dp-12">
              {[
                { label: 'Sedentary', sub: 'Office work, little exercise' },
                { label: 'Lightly Active', sub: '1-2 days of exercise/week' },
                { label: 'Moderately Active', sub: '3-5 days of exercise/week' },
                { label: 'Very Active', sub: 'Daily intense training' }
              ].map(item => (
                <button 
                  key={item.label}
                  onClick={() => handleToggleSelection(item.label)}
                  className={`p-dp-16 border-2 rounded-m3-lg text-left transition-all ${selections.includes(item.label) ? 'bg-m3-secondaryContainer border-m3-secondary text-m3-onSecondaryContainer' : 'bg-m3-surface border-m3-outline/10'}`}
                >
                  <p className={typography.title.medium}>{item.label}</p>
                  <p className={typography.body.small + " opacity-70"}>{item.sub}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-dp-24 items-center text-center animate-in slide-in-from-right-4 duration-300 pt-dp-24">
            <div className="w-24 h-24 bg-m3-primaryContainer text-m3-onPrimaryContainer rounded-m3-full flex items-center justify-center animate-bounce">
               <M3Icon name={IconName.Zap} size={48} />
            </div>
            <div>
              <h2 className={typography.headline.small}>All Set!</h2>
              <p className={`${typography.body.medium} text-m3-onSurfaceVariant mt-2`}>We've calculated your initial metabolic baseline. You can now access personalized insights.</p>
            </div>
            <div className={`w-full p-dp-16 bg-m3-surfaceContainerHighest ${shape.large} border border-m3-primary/10`}>
              <div className="flex justify-between items-center mb-2">
                <span className={typography.label.large}>Metabolic Readiness</span>
                <span className={`${typography.title.large} text-m3-primary`}>84%</span>
              </div>
              <div className="h-2 w-full bg-m3-outline/10 rounded-m3-full">
                <div className="h-full bg-m3-primary rounded-m3-full w-[84%]"></div>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] justify-between pb-dp-24">
      <div className="flex flex-col gap-dp-16">
        <div className="h-1.5 w-full bg-m3-surfaceContainerHighest rounded-m3-full overflow-hidden">
          <div className="h-full bg-m3-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
        {renderStepContent()}
      </div>

      <div className="flex gap-dp-12 mt-dp-32">
        {step > 0 && step < totalSteps - 1 && (
          <button 
            onClick={prevStep} 
            className={`h-dp-48 px-dp-24 border border-m3-outline/30 ${shape.medium} ${typography.label.large} text-m3-onSurface`}
          >
            BACK
          </button>
        )}
        <button 
          onClick={nextStep} 
          className={`h-dp-48 flex-1 bg-m3-primary text-m3-onPrimary ${shape.medium} ${typography.label.large} shadow-md flex items-center justify-center gap-2 uppercase tracking-wide`}
        >
          {step === totalSteps - 1 ? 'Go to Dashboard' : 'Continue'}
          {step < totalSteps - 1 && <M3Icon name={IconName.Forward} size={18} />}
        </button>
      </div>
    </div>
  );
};
