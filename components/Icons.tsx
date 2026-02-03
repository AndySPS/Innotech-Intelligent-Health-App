
import React from 'react';
import { 
  Home, 
  Settings, 
  Search, 
  Menu, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical, 
  Bell, 
  User, 
  Plus,
  Check,
  Info,
  AlertTriangle,
  Mail,
  Calendar,
  Layers,
  MapPin,
  Star,
  Activity,
  Heart,
  Zap,
  MessageSquare,
  Send
} from 'lucide-react';

export enum IconName {
  Home = 'home',
  Settings = 'settings',
  Search = 'search',
  Menu = 'menu',
  Back = 'back',
  Forward = 'forward',
  More = 'more',
  Notification = 'notification',
  Profile = 'profile',
  Add = 'add',
  Done = 'done',
  Info = 'info',
  Warning = 'warning',
  Email = 'email',
  Calendar = 'calendar',
  Layers = 'layers',
  MapPin = 'map-pin',
  Star = 'star',
  Activity = 'activity',
  Heart = 'heart',
  Zap = 'zap',
  Chat = 'chat',
  Send = 'send'
}

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

const IconMap: Record<IconName, React.FC<any>> = {
  [IconName.Home]: Home,
  [IconName.Settings]: Settings,
  [IconName.Search]: Search,
  [IconName.Menu]: Menu,
  [IconName.Back]: ChevronLeft,
  [IconName.Forward]: ChevronRight,
  [IconName.More]: MoreVertical,
  [IconName.Notification]: Bell,
  [IconName.Profile]: User,
  [IconName.Add]: Plus,
  [IconName.Done]: Check,
  [IconName.Info]: Info,
  [IconName.Warning]: AlertTriangle,
  [IconName.Email]: Mail,
  [IconName.Calendar]: Calendar,
  [IconName.Layers]: Layers,
  [IconName.MapPin]: MapPin,
  [IconName.Star]: Star,
  [IconName.Activity]: Activity,
  [IconName.Heart]: Heart,
  [IconName.Zap]: Zap,
  [IconName.Chat]: MessageSquare,
  [IconName.Send]: Send,
};

export const M3Icon: React.FC<IconProps> = ({ name, size = 24, className = '' }) => {
  const Component = IconMap[name];
  if (!Component) return null;
  return <Component size={size} className={className} />;
};
