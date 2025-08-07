import { MenuItem } from "../../types/components.types";
export const defaultMenuItems: MenuItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    href: '/dashboard',
    icon: 'layout-dashboard'
  },
  { 
    id: 'transactions', 
    label: 'Transactions', 
    href: '/transactions',
    icon: 'credit-card'
  },
  { 
    id: 'reports', 
    label: 'Reports', 
    href: '/reports',
    icon: 'file-text'
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    href: '/settings',
    icon: 'settings'
  },
];