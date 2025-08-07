import { 
  LayoutDashboard, 
  CreditCard, 
  FileText, 
  Settings,
  LucideIcon 
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  'layout-dashboard': LayoutDashboard,
  'credit-card': CreditCard,
  'file-text': FileText,
  'settings': Settings,
  'home': LayoutDashboard,
  'transactions': CreditCard,
  'reports': FileText,
  'cog': Settings,
};

export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || LayoutDashboard; // fallback icon
};
