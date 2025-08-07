'use client';
import { ChevronDown } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface SortableTableHeaderProps {
  children: React.ReactNode;
  sortKey: string;
  currentSort: string;
  currentDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
  className?: string;
}

const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  children,
  sortKey,
  currentSort,
  currentDirection,
  onSort,
  className
}) => {
  const isActive = currentSort === sortKey;

  return (
    <Button
      variant="ghost"
      className={cn(
        "h-auto p-0 text-left justify-start font-medium text-gray-500 hover:text-gray-900 hover:bg-transparent",
        className
      )}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isActive && currentDirection === 'desc' && "rotate-180",
          isActive ? "text-gray-900" : "text-gray-400"
        )} />
      </div>
    </Button>
  );
};

export default SortableTableHeader;
