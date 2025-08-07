'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  user, 
  size = 'md', 
  className,
  showTooltip = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div className="relative group">
      <Avatar className={cn(sizeClasses[size], className)}>
        {user.avatar && !imageError ? (
          <AvatarImage 
            src={user.avatar} 
            alt={user.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="object-cover"
          />
        ) : null}
        <AvatarFallback 
          className={cn(
            "bg-gradient-to-br font-medium text-white transition-colors",
            imageLoading && "animate-pulse bg-gray-300",
            !imageLoading && "from-blue-400 to-blue-600"
          )}
        >
          {user.initials || getInitials(user.name)}
        </AvatarFallback>
      </Avatar>

      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          {user.name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;