import { LayoutGrid, Plus, Download, Upload, Calculator, Calendar, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from '../ui/button';

const QuickActionsButton = () => {
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-transaction':
        console.log('Open add transaction modal');
        break;
      case 'export-data':
        console.log('Export data');
        break;
      case 'import-data':
        console.log('Import data');
        break;
      case 'calculator':
        console.log('Open calculator');
        break;
      case 'calendar':
        console.log('Open calendar');
        break;
      case 'generate-report':
        console.log('Generate report');
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <LayoutGrid className="h-5 w-5" />
          <span className="sr-only">Quick actions</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleQuickAction('add-transaction')}>
          <Plus className="mr-2 h-4 w-4" />
          <span>Add Transaction</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleQuickAction('generate-report')}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Generate Report</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleQuickAction('calculator')}>
          <Calculator className="mr-2 h-4 w-4" />
          <span>Calculator</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleQuickAction('calendar')}>
          <Calendar className="mr-2 h-4 w-4" />
          <span>Calendar</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleQuickAction('export-data')}>
          <Download className="mr-2 h-4 w-4" />
          <span>Export Data</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleQuickAction('import-data')}>
          <Upload className="mr-2 h-4 w-4" />
          <span>Import Data</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickActionsButton;