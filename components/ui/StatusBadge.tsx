'use client';
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed';
  label?: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label,
  className 
}) => {
  const statusConfig = {
    active: {
      variant: 'default' as const,
      className: 'bg-gray-200 text-gray-900 hover:bg-gray-200 ',
      dot: 'bg-green-500'
    },
    inactive: {
      variant: 'secondary' as const,
      className: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
      dot: 'bg-gray-500'
    },
    pending: {
      variant: 'outline' as const,
      className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      dot: 'bg-yellow-500'
    },
    completed: {
      variant: 'default' as const,
      className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      dot: 'bg-blue-500'
    }
  };

  const config = statusConfig[status];

  return (
    <Badge 
      variant={config.variant}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-2xl",
        config.className,
        className
      )}
    >
      <div className={cn("h-2 w-2 rounded-full", config.dot)} />
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default StatusBadge;