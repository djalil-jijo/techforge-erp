"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { MOCK_TRANSACTIONS } from "@/lib/mock-data";
import { DollarSign, Search, Filter, ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredTransactions = MOCK_TRANSACTIONS.filter((tx) => {
    const matchesSearch = tx.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalCollected = MOCK_TRANSACTIONS.filter(t => t.status === "Completed").reduce((sum, t) => sum + t.amount, 0);
  const pendingCollection = MOCK_TRANSACTIONS.filter(t => t.status === "Pending").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Financial Payments Core
          <span className="text-xs bg-emerald-glow/10 border border-emerald-glow/35 text-emerald-glow font-mono px-2 py-0.5 rounded-full font-bold">
            Ledger Log
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Monitor course subscriptions, FabLab engraving invoices, and outstanding dues.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Income Collected"
          value={`${totalCollected.toLocaleString()} DZD`}
          change="Completed payments"
          changeType="increase"
          icon={TrendingUp}
          themeColor="emerald"
        />
        <StatCard
          title="Pending Receivables"
          value={`${pendingCollection.toLocaleString()} DZD`}
          change="Pending clearance"
          changeType="neutral"
          icon={DollarSign}
          themeColor="amber"
        />
        <StatCard
          title="Total Financial Operations"
          value={MOCK_TRANSACTIONS.length}
          change="Logged transactions"
          changeType="neutral"
          icon={ArrowUpRight}
          themeColor="cyan"
        />
      </div>

      {/* List Ledger */}
      <GlassCard className="space-y-6" hoverable={false}>
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name or transaction ID..."
              className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-emerald-glow"
            />
          </div>

          <div className="flex items-center gap-2 bg-obsidian-950 px-3 py-2 rounded-xl border border-obsidian-850">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-transparent text-xs text-gray-300 focus:outline-none cursor-pointer pr-4 font-bold"
            >
              <option value="All" className="bg-obsidian-950">All Types</option>
              <option value="Subscription" className="bg-obsidian-950">Subscriptions</option>
              <option value="Service" className="bg-obsidian-950">Services</option>
              <option value="Workshop" className="bg-obsidian-950">Workshops</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                <th className="pb-3 font-semibold">Transaction ID</th>
                <th className="pb-3 font-semibold">Student / Member</th>
                <th className="pb-3 font-semibold">Service Type</th>
                <th className="pb-3 font-semibold">Log Date</th>
                <th className="pb-3 font-semibold text-right">Amount</th>
                <th className="pb-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-obsidian-900/40 transition-colors">
                  <td className="py-3.5 font-mono text-gray-400 font-semibold">{tx.id}</td>
                  <td className="py-3.5 font-bold text-white">{tx.studentName}</td>
                  <td className="py-3.5 text-gray-300">
                    <span className="px-2 py-0.5 rounded-md bg-obsidian-850 border border-obsidian-800 text-[10px]">
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-gray-400">{tx.date}</td>
                  <td className="py-3.5 font-mono text-right font-extrabold text-cyber-cyan">
                    {tx.amount.toLocaleString()} DZD
                  </td>
                  <td className="py-3.5 text-center">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold border",
                        tx.status === "Completed" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow",
                        tx.status === "Pending" && "bg-laser-amber/5 border-laser-amber/20 text-laser-amber",
                        tx.status === "Refunded" && "bg-neon-red/5 border-neon-red/20 text-neon-red"
                      )}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
