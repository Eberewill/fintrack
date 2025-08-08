'use client';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { SummaryCardProps } from '@/types/components.types';


const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  amount,
  change,
  isCurrency = true,
  className
}) => {
  const formatAmount = () => {
    if (isCurrency && typeof amount === 'number') {
      return `$${amount.toLocaleString()}`;
    }
    return amount.toString();
  };

  const changeColor = change > 0 ? 'text-primary' : 'text-red-600' 
  const changeSign = change > 0 ? '+' : '';

  return (
    <div className={cn(
      "bg-gray-50 rounded-lg p-6 transition-all duration-200 hover:bg-gray-100/80",
      className
    )}>
   
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <Button variant="ghost" size="sm" className="h-auto p-1 text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>


      <div className=" text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {formatAmount()}
      </div>

      <div className={cn("text-sm font-medium", changeColor)}>
        {changeSign}{change}%
      </div>
    </div>
  );
};

export default SummaryCard;