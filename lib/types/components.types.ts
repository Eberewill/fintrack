

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