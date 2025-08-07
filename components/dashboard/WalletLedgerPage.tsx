"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "./PageHeader";
import {
  sampleDashboardSummary,
  sampleTransactions,
  walletLedgerUsers,
} from "@/lib/mocks";
import DashboardOverview from "./DashboardOverview";
import TransactionTable from "./TransactionTable";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "transactions", label: "Transactions" },
];

const WalletLedgerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview"); //default overview tab
  const actions = <Button className=" text-gray-900 rounded-2xl">Share</Button>;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Wallet Ledger"
        isActive={true}
        users={walletLedgerUsers}
        actions={actions}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-8">
        {activeTab === "overview" && (
          <DashboardOverview
            summary={sampleDashboardSummary}
            transactions={sampleTransactions}
          />
        )}
        {activeTab === "transactions" && (
          <div>
            <TransactionTable transactions={sampleTransactions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletLedgerPage;
