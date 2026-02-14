"use client";
import { useState, useEffect } from "react";
import SendMoneyCard from "./SendMoneyCard";
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

  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const fetchData = async () => {
    try {
      const [userRes, txRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/transactions")
      ]);

      if (userRes.ok && txRes.ok) {
        const userData = await userRes.json();
        const txData = await txRes.json();

        setCurrentUser(userData.data);
        setTransactions(txData.data);

        // Calculate summary
        const totalDebits = txData.data.filter((t: any) => t.type === 'debit').reduce((acc: number, t: any) => acc + Math.abs(t.amount), 0);
        const totalCredits = txData.data.filter((t: any) => t.type === 'credit').reduce((acc: number, t: any) => acc + t.amount, 0);

        setSummary({
          totalBalance: userData.data.balance,
          totalCredits,
          totalDebits,
          transactionCount: txData.data.length,
          balanceChange: 0, // Mock for now
          creditsChange: 0,
          debitsChange: 0,
          transactionChange: 0
        });
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && summary && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <DashboardOverview
                  summary={summary}
                  transactions={transactions.slice(0, 5)} // Show recent 5 in overview
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
                <TransactionTable transactions={transactions} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div>
          <SendMoneyCard onTransactionComplete={fetchData} />
        </div>
      </div>
    </div>
  );
};

export default WalletLedgerPage;
