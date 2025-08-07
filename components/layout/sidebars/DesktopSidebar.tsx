'use client';
import { SidebarProps } from "@/types/components.types";
import { cn } from "@/lib/utils";
import NavigationItems from "../NavigationItems";
import { useSidebar } from "@/hooks/useSidebar";

const DesktopSidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  
    const { isCollapsed } = useSidebar();
  return (
   <aside className={cn(
  "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col  lg:bg-white lg:pt-16",
  "transition-all duration-300 ease-in-out", 
  isCollapsed ? "lg:w-20" : "lg:w-68" 
)}>
  <div className="flex-1 flex flex-col min-h-0 pt-4">
    <div className={cn(
      "flex-1 transition-all duration-300",
      isCollapsed ? "px-1" : "px-4" 
    )}>
      <NavigationItems items={menuItems} />
    </div>
  </div>
</aside>
  );
};

export default DesktopSidebar