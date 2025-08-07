"use client";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  SortDirection,
  SortField,
  Transaction,
} from "@/types/components.types";
import SortableTableHeader from "../ui/SortableTableHeader";
import TransactionTypeIndicator from "../ui/TransactionTypeIndicator";
import { useIsMobile } from "@/hooks/useMobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TransactionTableProps {
  transactions: Transaction[];
  className?: string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  className,
}) => {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const isMobile = useIsMobile(); // Mobile breakpoint

  const handleSort = (field: string) => {
    const sortFieldValue = field as SortField;

    if (sortField === sortFieldValue) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(sortFieldValue);
      setSortDirection("asc");
    }
  };

  //sorting options
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "date") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortField === "amount") {
        aValue = Math.abs(aValue as number);
        bValue = Math.abs(bValue as number);
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [transactions, sortField, sortDirection]);

  const formatAmount = (amount: number) => {
    const absAmount = Math.abs(amount);
    return amount >= 0
      ? `$${absAmount.toLocaleString()}`
      : `-$${absAmount.toLocaleString()}`;
  };

  // Mobile Card View
  if (isMobile) {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <span className="text-sm font-medium text-gray-600">
            Transactions
          </span>
          <Select value={sortField} onValueChange={handleSort}>
            <SelectTrigger className="w-[120px] h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="remark">Remark</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {sortedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500">
                    {transaction.date}
                  </div>
                  <div className="font-medium text-gray-900 mt-1">
                    {transaction.remark}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={cn(
                      "text-lg font-bold",
                      transaction.amount >= 0
                        ? "text-green-700"
                        : "text-gray-900"
                    )}
                  >
                    {formatAmount(transaction.amount)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.currency}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <TransactionTypeIndicator type={transaction.type} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop Table View
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="py-4 text-left">
                <SortableTableHeader
                  sortKey="date"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                >
                  Date
                </SortableTableHeader>
              </th>
              <th className="py-4 text-left">
                <SortableTableHeader
                  sortKey="remark"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                >
                  Remark
                </SortableTableHeader>
              </th>
              <th className="py-4 text-left">
                <SortableTableHeader
                  sortKey="amount"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                >
                  Amount
                </SortableTableHeader>
              </th>
              <th className="py-4 text-left">
                <SortableTableHeader
                  sortKey="currency"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                >
                  Currency
                </SortableTableHeader>
              </th>
              <th className="py-4 text-left">
                <SortableTableHeader
                  sortKey="type"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                >
                  Type
                </SortableTableHeader>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-4 text-sm text-gray-900 ">
                  {transaction.date}
                </td>
                <td className="py-4 text-sm text-gray-900">
                  {transaction.remark}
                </td>
                <td className="py-4 text-sm ">
                  <span
                    className={cn(
                      transaction.amount >= 0
                        ? "text-green-700"
                        : "text-gray-900"
                    )}
                  >
                    {formatAmount(transaction.amount)}
                  </span>
                </td>
                <td className="py-4 text-sm text-gray-600">
                  {transaction.currency}
                </td>
                <td className="py-4">
                  <TransactionTypeIndicator type={transaction.type} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
