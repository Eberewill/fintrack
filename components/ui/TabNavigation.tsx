'use client';
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className
}) => {
  return (
    <div className={cn("border-b border-gray-200", className)}>
      <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              disabled={tab.disabled}
              className={cn(
                "relative h-auto px-0 py-3 font-medium text-sm transition-colors whitespace-nowrap flex-shrink-0",
                "border-b-2 border-transparent rounded-none",
                "hover:text-gray-900 hover:bg-transparent",
                isActive
                  ? "text-primary border-primary"
                  : "text-gray-500",
                tab.disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
            >
              <span className="flex items-center space-x-2">
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={cn(
                    "px-2 py-0.5 text-xs rounded-full",
                    isActive 
                      ? "bg-primary text-primary"
                      : "bg-gray-100 text-gray-600"
                  )}>
                    {tab.count}
                  </span>
                )}
              </span>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;