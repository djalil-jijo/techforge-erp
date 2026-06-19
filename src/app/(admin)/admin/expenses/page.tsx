"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Search, Filter, ShoppingBag, ArrowDownRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface Expense {
  id: string;
  item: string;
  category: "Hardware" | "Filament" | "Tools" | "Utilities";
  amount: number;
  date: string;
  status: "Paid" | "Pending";
}

const MOCK_EXPENSES: Expense[] = [
  { id: "EXP-101", item: "3D Printer Filament (PLA 10kg)", category: "Filament", amount: 28000, date: "2026-06-15", status: "Paid" },
  { id: "EXP-102", item: "Arduino Uno Starter Kits (x10)", category: "Hardware", amount: 35000, date: "2026-06-12", status: "Paid" },
  { id: "EXP-103", item: "Raspberry Pi 4 Model B (x5)", category: "Hardware", amount: 55000, date: "2026-06-10", status: "Paid" },
  { id: "EXP-104", item: "Soldering Station Equipment", category: "Tools", amount: 18000, date: "2026-06-08", status: "Pending" },
  { id: "EXP-105", item: "FabLab Space Air Cooling Maintenance", category: "Utilities", amount: 12000, date: "2026-06-05", status: "Paid" },
];

export default function Expenses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredExpenses = MOCK_EXPENSES.filter((exp) => {
    const matchesSearch = exp.item.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || exp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSpent = MOCK_EXPENSES.filter(e => e.status === "Paid").reduce((sum, e) => sum + e.amount, 0);
  const pendingSpent = MOCK_EXPENSES.filter(e => e.status === "Pending").reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Expense Ledger
          <span className="text-xs bg-neon-red/10 border border-neon-red/35 text-neon-red font-mono px-2 py-0.5 rounded-full font-bold">
            Outflow tracking
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Monitor filament acquisitions, electronics purchases, and laboratory upkeep costs.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Paid Expenses"
          value={`${totalSpent.toLocaleString()} DZD`}
          change="Cleared invoices"
          changeType="neutral"
          icon={ArrowDownRight}
          themeColor="amber"
        />
        <StatCard
          title="Outstanding Invoices"
          value={`${pendingSpent.toLocaleString()} DZD`}
          change="Awaiting confirmation"
          changeType="decrease"
          icon={ShoppingBag}
          themeColor="purple"
        />
        <StatCard
          title="Total Expense Queries"
          value={MOCK_EXPENSES.length}
          change="Logged items"
          changeType="neutral"
          icon={Layers}
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
              placeholder="Search by item description or expense ID..."
              className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-neon-red"
            />
          </div>

          <div className="flex items-center gap-2 bg-obsidian-950 px-3 py-2 rounded-xl border border-obsidian-850">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-xs text-gray-300 focus:outline-none cursor-pointer pr-4 font-bold"
            >
              <option value="All" className="bg-obsidian-950">All Categories</option>
              <option value="Hardware" className="bg-obsidian-950">Hardware</option>
              <option value="Filament" className="bg-obsidian-950">Filaments</option>
              <option value="Tools" className="bg-obsidian-950">Tools</option>
              <option value="Utilities" className="bg-obsidian-950">Utilities</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                <th className="pb-3 font-semibold">Expense ID</th>
                <th className="pb-3 font-semibold">Item Purchased</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Invoice Date</th>
                <th className="pb-3 font-semibold text-right">Cost</th>
                <th className="pb-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-obsidian-900/40 transition-colors">
                  <td className="py-3.5 font-mono text-gray-400 font-semibold">{exp.id}</td>
                  <td className="py-3.5 font-bold text-white">{exp.item}</td>
                  <td className="py-3.5 text-gray-300">
                    <span className="px-2 py-0.5 rounded-md bg-obsidian-850 border border-obsidian-800 text-[10px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-gray-400">{exp.date}</td>
                  <td className="py-3.5 font-mono text-right font-extrabold text-neon-red">
                    {exp.amount.toLocaleString()} DZD
                  </td>
                  <td className="py-3.5 text-center">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold border",
                        exp.status === "Paid" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow",
                        exp.status === "Pending" && "bg-laser-amber/5 border-laser-amber/20 text-laser-amber"
                      )}
                    >
                      {exp.status}
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
