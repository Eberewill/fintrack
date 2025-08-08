"use client";
import { useState } from "react";
import { Plus, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleTransactions } from "@/lib/mocks";
import PageHeader from "@/components/dashboard/PageHeader";
import TransactionTable from "@/components/dashboard/TransactionTable";

const EnhancedTransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Filter transactions
  const filteredTransactions = sampleTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.remark.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm);

    const matchesType =
      filterType === "all" ||
      (filterType === "credit" && transaction.type === "Credit") ||
      (filterType === "debit" && transaction.type === "Debit");

    return matchesSearch && matchesType;
  });

  const actions = (
    <div className="flex space-x-2">
      <Button variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button className="bg-primary hover:bg-primary/90 text-white">
        <Plus className="h-4 w-4 mr-2" />
        Add Transaction
      </Button>
    </div>
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Transactions"
        subtitle="View and manage all your financial transactions"
        actions={actions}
      />

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full sm:w-[180px]">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="text-gray-900">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credits Only</SelectItem>
                <SelectItem value="debit">Debits Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
};

export default EnhancedTransactionsPage;
