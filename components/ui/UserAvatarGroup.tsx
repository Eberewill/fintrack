// components/ui/UserAvatarGroup.tsx - Cleaned version without +remainingCount
'use client';
import { UserAvatarGroupProps } from '@/types/components.types';
import UserAvatar from './UserAvatar';
import { cn } from "@/lib/utils";


const UserAvatarGroup: React.FC<UserAvatarGroupProps> = ({
  users,
  maxVisible = 4,
  size = 'md',
  className,
  showNames = true,
  showTooltips = true
}) => {
  const visibleUsers = users.slice(0, maxVisible);
  const totalHiddenCount = Math.max(0, users.length - maxVisible);

  const formatUserNames = () => {
    if (users.length === 0) return '';
    
    // Show first few visible names + total hidden count
    const visibleNames = visibleUsers.map(u => u.name.split(' ')[0]);
    
    if (totalHiddenCount > 0) {
      return `${visibleNames.join(', ')} +${totalHiddenCount} others`;
    }
    
    return visibleNames.join(', ');
  };

  return (
    <div className={cn(
      "flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0", 
      className
    )}>

      <div className="flex -space-x-1 sm:-space-x-2">
        {visibleUsers.map((user, index) => (
          <div
            key={user.id}
            className="relative"
            style={{ zIndex: visibleUsers.length - index }}
          >
            <UserAvatar
              user={user}
              size={size}
              showTooltip={showTooltips}
              className="ring-2 ring-white hover:ring-blue-200 transition-all duration-200 hover:scale-110 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {showNames && (
        <span className="text-sm text-gray-600 sm:ml-3 truncate">
          {formatUserNames()}
        </span>
      )}
    </div>
  );
};

export default UserAvatarGroup;