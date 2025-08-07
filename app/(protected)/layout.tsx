"use client";
import Header from "@/components/layout/Header";
import DesktopSidebar from "@/components/layout/sidebars/DesktopSidebar";
import { useSidebar } from "@/hooks/useSidebar";
import { defaultMenuItems } from "@/lib/constants/defaultMenuItems";
import { LayoutProps } from "@/types/components.types";
import { cn } from "@/lib/utils";

const Layout: React.FC<LayoutProps> = ({
  children,
  menuItems = defaultMenuItems,
}) => {
  const { isCollapsed } = useSidebar();
  return (
    <div className="min-h-screen bg-white">
      <DesktopSidebar menuItems={menuItems} />
      <Header />
      <main
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:ml-16" : "lg:ml-64" // Margin matches sidebar width
        )}
      >
        <div className="px-4 py-6 lg:px-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
