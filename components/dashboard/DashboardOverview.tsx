'use client';
import { DashboardSummary, Transaction } from '@/types/components.types';
//import SummaryCard from './ui/SummaryCard';
import TransactionTable from './TransactionTable';
import SummaryCard from '../ui/SummaryCard';
//import { DashboardSummary, Transaction } from '@/types/dashboard.types';

interface DashboardOverviewProps {
  summary: DashboardSummary;
  transactions: Transaction[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  summary,
  transactions
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Balance"
            amount={summary.totalBalance}
            change={summary.balanceChange}
          />
          <SummaryCard
            title="Total Credits"
            amount={summary.totalCredits}
            change={summary.creditsChange}
          />
          <SummaryCard
            title="Total Debits"
            amount={summary.totalDebits}
            change={summary.debitsChange}
          />
          <SummaryCard
            title="Transactions"
            amount={summary.transactionCount}
            change={summary.transactionChange}
            isCurrency={false}
          />
        </div>
      </div>

      <div>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default DashboardOverview;