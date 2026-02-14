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

import { motion, AnimatePresence } from "framer-motion";

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
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <DashboardOverview
                summary={sampleDashboardSummary}
                transactions={sampleTransactions}
              />
            </motion.div>
          )}
          {activeTab === "transactions" && (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <TransactionTable transactions={sampleTransactions} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WalletLedgerPage;
