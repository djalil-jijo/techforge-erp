"use client";

import React from "react";
import { StatCard } from "@/components/ui/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { TrackPieChart } from "@/components/charts/TrackPieChart";
import { 
  MOCK_TRANSACTIONS, 
  MOCK_LIVE_DEVICES 
} from "@/lib/mock-data";
import { 
  TrendingUp, 
  Users, 
  Layers, 
  Activity, 
  Terminal,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Dashboard Title & Hero */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Executive Command Center
            <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-2 py-0.5 rounded-full font-bold pulse-cyan">
              Live
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time telemetry and management portal for TechForge FabLab.
          </p>
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono rounded-xl border border-obsidian-800 hover:border-obsidian-700 bg-obsidian-900 text-gray-400 hover:text-cyber-cyan transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Core System
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Monthly Revenue"
          value="320,000 DZD"
          change="+18.4%"
          changeType="increase"
          icon={TrendingUp}
          themeColor="emerald"
        />
        <StatCard
          title="Active Students"
          value="105"
          change="+8.2%"
          changeType="increase"
          icon={Users}
          themeColor="cyan"
        />
        <StatCard
          title="Active Projects"
          value="12"
          change="+25.0%"
          changeType="increase"
          icon={Layers}
          themeColor="purple"
        />
        <StatCard
          title="Hardware Vault Status"
          value="82%"
          change="-2.1%"
          changeType="decrease"
          icon={Activity}
          themeColor="amber"
        />
      </div>

      {/* Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 flex flex-col justify-between" glowColor="cyan">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Financial Telemetry</h4>
              <p className="text-xs text-gray-500 font-mono uppercase mt-0.5">Year-To-Date (YTD) Revenue</p>
            </div>
            <span className="text-xs font-mono bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan px-2 py-1 rounded-lg font-bold">
              Dynamic
            </span>
          </div>
          <RevenueChart />
        </GlassCard>

        <GlassCard className="flex flex-col justify-between" glowColor="purple">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Track Metrics</h4>
              <p className="text-xs text-gray-500 font-mono uppercase mt-0.5">Student Enrollment Ratios</p>
            </div>
          </div>
          <TrackPieChart />
        </GlassCard>
      </div>

      {/* Bottom Grid: Live Devices & Financial Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Financial Ledger */}
        <GlassCard className="lg:col-span-2" hoverable={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Recent Transactions Ledger</h4>
              <p className="text-xs text-gray-500 font-mono uppercase mt-0.5">Audit log of latest income payments</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                  <th className="pb-3 font-semibold">TX ID</th>
                  <th className="pb-3 font-semibold">Student / Member</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold text-right">Amount</th>
                  <th className="pb-3 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-850">
                {MOCK_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-obsidian-900/40 transition-colors">
                    <td className="py-3.5 font-mono text-gray-400 font-semibold">{tx.id}</td>
                    <td className="py-3.5 font-bold text-white">{tx.studentName}</td>
                    <td className="py-3.5 text-gray-300">
                      <span className="px-2 py-0.5 rounded-md bg-obsidian-800 border border-obsidian-700">
                        {tx.type}
                      </span>
                    </td>
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

        {/* Live Device Status */}
        <GlassCard glowColor="amber" hoverable={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Live Device Telemetry</h4>
              <p className="text-xs text-gray-500 font-mono uppercase mt-0.5">FabLab Network Signals</p>
            </div>
            <Terminal className="w-4 h-4 text-laser-amber animate-pulse" />
          </div>

          <div className="space-y-4">
            {MOCK_LIVE_DEVICES.map((device) => (
              <div 
                key={device.id} 
                className="p-3.5 rounded-xl bg-obsidian-900/50 border border-obsidian-800 hover:border-obsidian-750 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* Status Indicator Pulse */}
                  <span className="relative flex h-2.5 w-2.5">
                    {device.status !== "offline" && (
                      <span className={cn(
                        "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                        device.status === "printing" && "bg-cyber-cyan",
                        device.status === "cutting" && "bg-laser-amber",
                        device.status === "idle" && "bg-emerald-glow"
                      )} />
                    )}
                    <span className={cn(
                      "relative inline-flex rounded-full h-2.5 w-2.5",
                      device.status === "printing" && "bg-cyber-cyan",
                      device.status === "cutting" && "bg-laser-amber",
                      device.status === "idle" && "bg-emerald-glow",
                      device.status === "offline" && "bg-neon-red"
                    )} />
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white">{device.name}</h5>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase tracking-wide">
                      {device.status} {device.status !== "offline" && `• ${device.load}% Load`}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-gray-400">
                  {device.status === "offline" ? "ERR_TIMED_OUT" : `${device.ping} ms`}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
