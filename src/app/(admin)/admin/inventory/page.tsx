"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { MOCK_INVENTORY } from "@/lib/mock-data";
import { Search, Filter, Boxes, Cpu, AlertTriangle, Hammer, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const categories = ["All", "Robotics", "Electronics", "3D Printing", "CNC / Hardware", "Tools"];
  const statuses = ["All", "available", "limited", "maintenance", "out_of_stock"];

  // Filter items
  const filteredItems = MOCK_INVENTORY.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate Metrics
  const totalUniqueItems = MOCK_INVENTORY.length;
  const totalPhysicalItems = MOCK_INVENTORY.reduce((sum, item) => sum + item.totalQty, 0);
  const itemsInMaintenance = MOCK_INVENTORY.filter(item => item.status === "maintenance").length;
  const itemsOnLoan = MOCK_INVENTORY.reduce((sum, item) => sum + (item.totalQty - item.availableQty), 0);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          The Hardware Vault
          <span className="text-xs bg-laser-amber/10 border border-laser-amber/35 text-laser-amber font-mono px-2 py-0.5 rounded-full font-bold">
            Central Registry
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Monitor, update, and search active lab inventory and micro-controllers.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Distinct Models"
          value={totalUniqueItems}
          change={`${totalPhysicalItems} total units`}
          changeType="neutral"
          icon={Boxes}
          themeColor="cyan"
        />
        <StatCard
          title="Items Out on Custody"
          value={itemsOnLoan}
          change="Assigned to students"
          changeType="neutral"
          icon={Cpu}
          themeColor="purple"
        />
        <StatCard
          title="Under Maintenance"
          value={itemsInMaintenance}
          change="Pending repair/calibration"
          changeType="neutral"
          icon={AlertTriangle}
          themeColor="amber"
        />
      </div>

      {/* Filters and Controls */}
      <GlassCard className="space-y-6" hoverable={false}>
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by part number or model name..."
              className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-laser-amber focus:ring-1 focus:ring-laser-amber transition-all"
            />
          </div>

          {/* Filters triggers */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category dropdown */}
            <div className="flex items-center gap-2 bg-obsidian-950 px-3 py-2 rounded-xl border border-obsidian-850">
              <Filter className="w-3.5 h-3.5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs text-gray-300 focus:outline-none cursor-pointer pr-4 font-bold"
              >
                <option value="All" className="bg-obsidian-950">All Categories</option>
                {categories.filter(c => c !== "All").map(c => (
                  <option key={c} value={c} className="bg-obsidian-950">{c}</option>
                ))}
              </select>
            </div>

            {/* Status dropdown */}
            <div className="flex items-center gap-2 bg-obsidian-950 px-3 py-2 rounded-xl border border-obsidian-850">
              <Hammer className="w-3.5 h-3.5 text-gray-500" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent text-xs text-gray-300 focus:outline-none cursor-pointer pr-4 font-bold"
              >
                <option value="All" className="bg-obsidian-950">All Statuses</option>
                {statuses.filter(s => s !== "All").map(s => (
                  <option key={s} value={s} className="bg-obsidian-950">{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto pt-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-gray-500 font-mono text-xs">
              NO TELEMETRY MATCHES FOUND IN VAULT DATA.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                  <th className="pb-3 font-semibold">Asset ID</th>
                  <th className="pb-3 font-semibold">Item Model</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold text-center">In Stock</th>
                  <th className="pb-3 font-semibold text-center">Available</th>
                  <th className="pb-3 font-semibold">Location</th>
                  <th className="pb-3 font-semibold text-center">Status</th>
                  <th className="pb-3 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-850">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-obsidian-900/40 transition-colors">
                    <td className="py-3.5 font-mono text-gray-400 font-semibold">{item.id}</td>
                    <td className="py-3.5 font-bold text-white max-w-[200px] truncate">{item.name}</td>
                    <td className="py-3.5 text-gray-300">
                      <span className="px-2 py-0.5 rounded-md bg-obsidian-850 border border-obsidian-800 text-[10px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 text-center font-mono text-gray-300">{item.totalQty}</td>
                    <td className="py-3.5 text-center font-mono font-bold text-cyber-cyan">{item.availableQty}</td>
                    <td className="py-3.5 font-mono text-gray-400">{item.location}</td>
                    <td className="py-3.5 text-center">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize",
                          item.status === "available" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow",
                          item.status === "limited" && "bg-laser-amber/5 border-laser-amber/20 text-laser-amber",
                          item.status === "maintenance" && "bg-neon-red/5 border-neon-red/20 text-neon-red animate-pulse",
                          item.status === "out_of_stock" && "bg-gray-500/5 border-gray-500/20 text-gray-400"
                        )}
                      >
                        {item.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      <button 
                        onClick={() => alert(`Asset QR code: ${item.qrCode}`)}
                        className="p-1.5 rounded-lg border border-obsidian-800 hover:border-obsidian-700 bg-obsidian-950 text-gray-400 hover:text-cyber-cyan transition-all cursor-pointer"
                        title="View Asset Code"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
