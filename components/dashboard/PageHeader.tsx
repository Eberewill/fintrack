'use client';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from '../ui/button';
import StatusBadge from '../ui/StatusBadge';
import UserAvatarGroup from '../ui/UserAvatarGroup';
import TabNavigation from '../ui/TabNavigation';
import { PageHeaderProps } from '@/types/components.types';

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  isActive = true,
  users = [],
  actions,
  tabs = [],
  activeTab = tabs[0]?.id || '',
  onTabChange = () => {},
  className
}) => {
  return (
    <div className={cn("space-y-4 md:space-y-6", className)}>
   
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
    
        <div className="flex flex-col space-y-3 sm:space-y-0">

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center space-x-2">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                {title}
              </p>
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
            </div>
            {isActive && (
              <StatusBadge status="active" label="Active" className="flex-shrink-0" />
            )}
          </div>
          
      
          {subtitle && (
            <p className="text-sm text-gray-600 my-0.5">{subtitle}</p>
          )}
        </div>

  
        <div className="flex items-center justify-end space-x-2 sm:space-x-3 flex-shrink-0">
          {actions}
          <Button variant="outline" size="sm" className="p-2 flex-shrink-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </div>

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <UserAvatarGroup 
            users={users} 
            size="md"
            className="min-w-0" 
          />
        </div>
      )}


      {tabs.length > 0 && (
        <div className="overflow-x-auto">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
            className="min-w-0"
          />
        </div>
      )}
    </div>
  );
};

export default PageHeader;