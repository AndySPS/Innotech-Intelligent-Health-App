
import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { IconName } from './components/Icons';

// Views
import { AuthView } from './views/AuthView';
import { OnboardingView } from './views/OnboardingView';
import { DashboardView } from './views/DashboardView';
import { ActivityDetailsView } from './views/ActivityDetailsView';
import { ReportsListingView } from './views/ReportsListingView';
import { ReportsDetailView } from './views/ReportsDetailView';
import { ClinicDiscoveryView } from './views/ClinicDiscoveryView';
import { SettingsView } from './views/SettingsView';
import { HealthPlanView } from './views/HealthPlanView';
import { GoalSelectionView } from './views/GoalSelectionView';
import { BookingDoctorView } from './views/BookingDoctorView';
import { BookingDateTimeView } from './views/BookingDateTimeView';
import { BookingConfirmationView } from './views/BookingConfirmationView';
import { AIAssistantView } from './views/AIAssistantView';

// --- Types ---
export type Screen = 
  | 'auth' 
  | 'onboarding' 
  | 'dashboard' 
  | 'settings' 
  | 'activity-details' 
  | 'reports-listing' 
  | 'reports-details' 
  | 'clinics'
  | 'health-plans'
  | 'goal-selection'
  | 'booking-doctor'
  | 'booking-datetime'
  | 'booking-success'
  | 'ai-assistant';

// --- Mock Data ---
const METRICS = [
  {
    id: 'steps',
    label: 'Steps',
    value: '8,432',
    unit: 'steps',
    icon: IconName.Activity,
    color: 'bg-m3-secondaryContainer',
    insight: 'You are 15% more active than last week. Keep walking to improve your metabolic score.',
    data: [40, 60, 45, 90, 75, 85, 70]
  },
  {
    id: 'heart',
    label: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    icon: IconName.Heart,
    color: 'bg-m3-tertiaryContainer',
    insight: 'Your resting heart rate is within the athletic range. This indicates strong cardiovascular efficiency.',
    data: [72, 75, 70, 68, 71, 74, 72]
  },
  {
    id: 'sleep',
    label: 'Sleep',
    value: '7h 20m',
    unit: '',
    icon: IconName.Layers,
    color: 'bg-m3-primaryContainer',
    insight: 'Sleep quality was "Good" (82/100). You entered REM cycle 3 times, which is optimal for cognitive recovery.',
    data: [6, 8, 7, 7.5, 6.5, 9, 7.2]
  },
  {
    id: 'calories',
    label: 'Calories',
    value: '1,840',
    unit: 'kcal',
    icon: IconName.Zap,
    color: 'bg-m3-secondaryContainer',
    insight: 'You have burned more calories today than 80% of users in your age group.',
    data: [1200, 1500, 1800, 2100, 1600, 1900, 1840]
  }
];

const REPORTS = [
  {
    id: 'REP-001',
    packageName: 'Comprehensive Wellness Plus',
    date: '15 May 2024',
    clinic: 'Innotech Health Clinic Central',
    doctor: 'Dr. Sarah Wilson',
    summary: 'Cholesterol levels are slightly elevated. Liver function is optimal.',
    status: 'Released',
    unread: true
  },
  {
    id: 'REP-002',
    packageName: 'Executive Heart Check',
    date: '10 Apr 2024',
    clinic: 'Metropolitan General Hospital',
    doctor: 'Dr. James Miller',
    summary: 'Cardiovascular assessment shows excellent heart rate variability.',
    status: 'Released',
    unread: false
  }
];

const CLINICS = [
  {
    id: 'CL-001',
    name: 'Innotech Central',
    specialty: 'Multispecialty Wellness',
    distance: '1.2 km',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
    packages: ['Full Metabolic', 'Cardio Screen']
  },
  {
    id: 'CL-002',
    name: 'Wellness Hub Sukhumvit',
    specialty: 'Anti-Aging & Longevity',
    distance: '3.5 km',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400',
    packages: ['Bio-Age Test', 'Vitamin Panel']
  }
];

// --- Main App Controller ---

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [selectedActivityId, setSelectedActivityId] = useState<string>('steps');
  const [selectedReportId, setSelectedReportId] = useState<string>('');
  
  // Booking Flow State
  const [bookingData, setBookingData] = useState({
    clinic: null as any,
    doctor: null as any,
    date: '',
    time: ''
  });

  useEffect(() => {
    const handleAINav = () => setCurrentScreen('ai-assistant');
    window.addEventListener('nav-ai', handleAINav);
    return () => window.removeEventListener('nav-ai', handleAINav);
  }, []);

  const activeMetric = METRICS.find(m => m.id === selectedActivityId) || METRICS[0];
  const activeReport = REPORTS.find(r => r.id === selectedReportId) || REPORTS[0];

  const getOnBack = () => {
    if (currentScreen === 'activity-details') return () => setCurrentScreen('dashboard');
    if (currentScreen === 'reports-details') return () => setCurrentScreen('reports-listing');
    if (currentScreen === 'booking-doctor') return () => setCurrentScreen('clinics');
    if (currentScreen === 'booking-datetime') return () => setCurrentScreen('booking-doctor');
    if (currentScreen === 'goal-selection') return () => setCurrentScreen('health-plans');
    if (currentScreen === 'ai-assistant') return () => setCurrentScreen('dashboard');
    return undefined;
  };

  const renderContent = () => {
    switch(currentScreen) {
      case 'auth': return <AuthView onLogin={() => setCurrentScreen('onboarding')} />;
      case 'onboarding': return <OnboardingView onFinish={() => setCurrentScreen('dashboard')} />;
      case 'dashboard': 
        return <DashboardView metrics={METRICS} onSelectActivity={(id) => { setSelectedActivityId(id); setCurrentScreen('activity-details'); }} />;
      case 'activity-details': 
        return <ActivityDetailsView metric={activeMetric} />;
      case 'reports-listing': 
        return <ReportsListingView reports={REPORTS} onSelectReport={(id) => { setSelectedReportId(id); setCurrentScreen('reports-details'); }} />;
      case 'reports-details': 
        return <ReportsDetailView report={activeReport} />;
      case 'clinics': 
        return <ClinicDiscoveryView clinics={CLINICS} onBook={(clinic) => {
          setBookingData({ ...bookingData, clinic });
          setCurrentScreen('booking-doctor');
        }} />;
      case 'booking-doctor':
        return <BookingDoctorView onSelect={(doctor) => {
          setBookingData({ ...bookingData, doctor });
          setCurrentScreen('booking-datetime');
        }} />;
      case 'booking-datetime':
        return <BookingDateTimeView onConfirm={(date, time) => {
          setBookingData({ ...bookingData, date, time });
          setCurrentScreen('booking-success');
        }} />;
      case 'booking-success':
        return <BookingConfirmationView data={bookingData} onDone={() => setCurrentScreen('dashboard')} />;
      case 'ai-assistant':
        return <AIAssistantView />;
      case 'settings': return <SettingsView onLogout={() => setCurrentScreen('auth')} />;
      case 'health-plans': 
        return <HealthPlanView onAddGoal={() => setCurrentScreen('goal-selection')} />;
      case 'goal-selection': 
        return <GoalSelectionView onSelect={() => setCurrentScreen('health-plans')} />;
      default: return null;
    }
  };

  const getTitle = () => {
    switch(currentScreen) {
      case 'auth': return 'Welcome';
      case 'onboarding': return 'Profile Setup';
      case 'dashboard': return 'Innotech Health';
      case 'activity-details': return `${activeMetric.label} Details`;
      case 'reports-listing': return 'Lab Reports';
      case 'reports-details': return 'Report Overview';
      case 'clinics': return 'Discover Clinics';
      case 'booking-doctor': return 'Select Specialist';
      case 'booking-datetime': return 'Schedule Visit';
      case 'booking-success': return 'Confirmed';
      case 'settings': return 'Account Settings';
      case 'health-plans': return 'Health Optimizer';
      case 'goal-selection': return 'Select Health Goal';
      case 'ai-assistant': return 'Health AI';
      default: return 'Innotech';
    }
  };

  const getActiveTab = () => {
    if (['dashboard', 'activity-details', 'ai-assistant'].includes(currentScreen)) return 0;
    if (['reports-listing', 'reports-details'].includes(currentScreen)) return 1;
    if (['clinics', 'booking-doctor', 'booking-datetime'].includes(currentScreen)) return 2;
    if (['health-plans', 'goal-selection'].includes(currentScreen)) return 3;
    if (currentScreen === 'settings') return 4;
    return -1;
  };

  const isNavHidden = () => {
    return (
      currentScreen === 'auth' || 
      currentScreen === 'onboarding' ||
      currentScreen === 'activity-details' || 
      currentScreen === 'reports-details' ||
      currentScreen === 'goal-selection' ||
      currentScreen === 'booking-doctor' ||
      currentScreen === 'booking-datetime' ||
      currentScreen === 'booking-success' ||
      currentScreen === 'ai-assistant'
    );
  };

  const onBackHandler = getOnBack();

  return (
    <MainLayout 
      title={getTitle()} 
      activeTab={getActiveTab()}
      onNavigate={(idx) => {
        if (idx === 0) setCurrentScreen('dashboard');
        if (idx === 1) setCurrentScreen('reports-listing');
        if (idx === 2) setCurrentScreen('clinics');
        if (idx === 3) setCurrentScreen('health-plans');
        if (idx === 4) setCurrentScreen('settings');
      }}
      hideNav={isNavHidden()}
      showBack={!!onBackHandler}
      onBack={onBackHandler}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default App;
