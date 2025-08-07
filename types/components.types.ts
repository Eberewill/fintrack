
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role?: string;
  department?: string;
}

export interface UserAvatarGroupProps {
  users: User[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showNames?: boolean;
  showTooltips?: boolean;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  isActive?: boolean;
  users?: User[];
  additionalUsersCount?: number;
  actions?: React.ReactNode;
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string; 
  isActive?: boolean; 
}

export interface HeaderProps {
  onMobileMenuToggle?: () => void;
  className?: string;
}

export interface SidebarProps {
  menuItems: MenuItem[];
  className?: string;
}

export interface MobileSidebarProps {
  menuItems: MenuItem[];
  children: React.ReactNode;
}

export interface LayoutProps {
  children: React.ReactNode;
  menuItems?: MenuItem[];
}

export interface Transaction {
  id: string;
  date: string;
  remark: string;
  amount: number;
  currency: string;
  type: 'Credit' | 'Debit';
}

export interface DashboardSummary {
  totalBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
  balanceChange: number;
  creditsChange: number;
  debitsChange: number;
  transactionChange: number;
}

export interface SummaryCardProps {
  title: string;
  amount: number | string;
  change: number;
  isCurrency?: boolean;
  className?: string;
}

export type SortField = 'date' | 'remark' | 'amount' | 'currency' | 'type';
export type SortDirection = 'asc' | 'desc';