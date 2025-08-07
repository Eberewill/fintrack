'use client';
import { usePathname, useRouter } from 'next/navigation';
import { MenuItem } from "@/types/components.types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { getIcon } from '@/lib/get-menu-icon';
import { useSidebar } from '@/hooks/useSidebar';
import { useIsMobile } from '@/hooks/useMobile';

const NavigationItems: React.FC<{ 
  items: MenuItem[]; 
  onItemClick?: (item: MenuItem) => void;
  className?: string;
}> = ({ items, onItemClick, className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed } = useSidebar();
  const isMobile = useIsMobile(1024); 

  const handleItemClick = (item: MenuItem) => {
    onItemClick?.(item);
    if (item.href) {
      router.push(item.href);
    }
  };

  const isItemActive = (item: MenuItem): boolean => {
    if (!item.href) return false;
    
    if (pathname === '/' && item.href === '/dashboard') return true;
    if (pathname === item.href) return true;
    
    const basePath = item.href;
    if (basePath !== '/' && pathname.startsWith(basePath + '/')) return true;
    
    switch (item.id) {
      case 'dashboard':
        return pathname === '/' || pathname === '/dashboard' || pathname.startsWith('/dashboard/');
      case 'transactions':
        return pathname === '/transactions' || pathname.startsWith('/transactions/');
      case 'reports':
        return pathname === '/reports' || pathname.startsWith('/reports/');
      case 'settings':
        return pathname === '/settings' || pathname.startsWith('/settings/');
      default:
        return false;
    }
  };

  const shouldShowIconOnly = isCollapsed && !isMobile;

  return (
    <nav className={cn("space-y-1", className)}>
      {items.map((item) => {
        const isActive = isItemActive(item);
        const IconComponent = getIcon(item.icon);
        
        return (
          <Button
            key={item.id}
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "rounded-2xl transition-all duration-300 ease-in-out cursor-pointer",
              shouldShowIconOnly
                ? "w-10 h-10 p-0 justify-center" // Desktop collapsed: icon only
                : "w-full justify-start px-3 py-2.5 h-auto",
              isActive
                ? "bg-gray-200 text-primary hover:bg-gray-100"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary"
            )}
            onClick={() => handleItemClick(item)}
            title={shouldShowIconOnly ? item.label : undefined}
          >
           
            {shouldShowIconOnly ? (
              <IconComponent className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-primary" : "text-gray-500"
              )} />
            ) : (
              <span className="truncate transition-opacity duration-300">
                {item.label}
              </span>
            )}
          </Button>
        );
      })}
    </nav>
  );
};

export default NavigationItems;