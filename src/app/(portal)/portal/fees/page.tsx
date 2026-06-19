"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Wallet, CheckCircle2, AlertCircle, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const FEES = [
  { id: "FEE-2026-06", description: "Robotics Advanced Track — June 2026", amount: 8500, dueDate: "2026-06-30", status: "pending" },
  { id: "FEE-2026-05", description: "Robotics Advanced Track — May 2026", amount: 8500, dueDate: "2026-05-31", status: "paid", paidDate: "2026-05-28" },
  { id: "FEE-2026-04", description: "Robotics Advanced Track — April 2026", amount: 8500, dueDate: "2026-04-30", status: "paid", paidDate: "2026-04-25" },
  { id: "FEE-WORKSHOP", description: "Arduino Advanced Workshop (April)", amount: 4000, dueDate: "2026-04-15", status: "paid", paidDate: "2026-04-10" },
];

export default function FeesStatement() {
  const totalDue = FEES.filter(f => f.status === "pending").reduce((a, f) => a + f.amount, 0);
  const totalPaid = FEES.filter(f => f.status === "paid").reduce((a, f) => a + f.amount, 0);

  return (
    <div className="space-y-8">
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Fees & Financial Statement
          <span className={cn(
            "text-xs font-mono px-2 py-0.5 rounded-full font-bold border",
            totalDue > 0 ? "bg-laser-amber/10 border-laser-amber/35 text-laser-amber" : "bg-emerald-glow/10 border-emerald-glow/35 text-emerald-glow"
          )}>
            {totalDue > 0 ? "Payment Due" : "All Clear"}
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Your course subscription history and current outstanding balances.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard title="Total Fees Paid" value={`${totalPaid.toLocaleString()} DZD`} change="This academic year" changeType="increase" icon={CheckCircle2} themeColor="emerald" />
        <StatCard title="Outstanding Balance" value={`${totalDue.toLocaleString()} DZD`} change={totalDue > 0 ? "Due before month end" : "No outstanding dues"} changeType={totalDue > 0 ? "decrease" : "neutral"} icon={Wallet} themeColor={totalDue > 0 ? "amber" : "cyan"} />
      </div>

      {/* Alert Banner for Pending Fees */}
      {totalDue > 0 && (
        <div className="p-5 rounded-2xl bg-laser-amber/5 border-2 border-laser-amber/30 flex items-start gap-4 text-xs">
          <AlertCircle className="w-5 h-5 text-laser-amber flex-shrink-0 mt-0.5 animate-pulse" />
          <div>
            <p className="font-bold text-laser-amber mb-1">Payment Reminder — {totalDue.toLocaleString()} DZD Due</p>
            <p className="text-gray-400 leading-relaxed">You have an outstanding subscription for June 2026. Please settle before the deadline to maintain uninterrupted access to all training sessions and FabLab resources.</p>
          </div>
        </div>
      )}

      {/* Fees Log */}
      <GlassCard hoverable={false} className="space-y-4">
        <h3 className="text-base font-bold text-white">Payment History Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                <th className="pb-3 font-semibold">Ref ID</th>
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 font-semibold">Due Date</th>
                <th className="pb-3 font-semibold text-right">Amount</th>
                <th className="pb-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {FEES.map((fee) => (
                <tr key={fee.id} className="hover:bg-obsidian-900/40 transition-colors">
                  <td className="py-3.5 font-mono text-gray-400 font-semibold">{fee.id}</td>
                  <td className="py-3.5 font-bold text-white">{fee.description}</td>
                  <td className="py-3.5 font-mono text-gray-400">{fee.dueDate}</td>
                  <td className="py-3.5 font-mono text-right font-extrabold text-cyber-cyan">{fee.amount.toLocaleString()} DZD</td>
                  <td className="py-3.5 text-center">
                    {fee.status === "paid" ? (
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold border bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow">
                        Paid {fee.paidDate}
                      </span>
                    ) : (
                      <button
                        onClick={() => alert(`Redirecting to payment gateway for ${fee.id}...`)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-laser-amber text-obsidian-950 font-bold text-[10px] hover:bg-laser-amber/90 cursor-pointer transition-colors mx-auto"
                      >
                        <CreditCard className="w-3 h-3" />
                        Pay Now
                      </button>
                    )}
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
