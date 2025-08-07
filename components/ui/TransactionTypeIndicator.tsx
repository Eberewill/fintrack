'use client';
import { cn } from '@/lib/utils';

interface TransactionTypeIndicatorProps {
  type: 'Credit' | 'Debit';
  className?: string;
}

const TransactionTypeIndicator: React.FC<TransactionTypeIndicatorProps> = ({
  type,
  className
}) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn(
        "w-2 h-2 rounded-full",
        type === 'Credit' ? 'bg-green-500' : 'bg-red-500'
      )} />
      <span className={cn(
        "text-sm text-gray-900",
      
      )}>
        {type}
      </span>
    </div>
  );
};

export default TransactionTypeIndicator;