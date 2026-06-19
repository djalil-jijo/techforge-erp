"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { MOCK_ASSIGNMENTS, MOCK_INVENTORY, Assignment } from "@/lib/mock-data";
import { Cpu, ArrowRightLeft, CheckCircle2, AlertTriangle, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustodyAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [showAssignForm, setShowAssignForm] = useState(false);
  
  // Form State
  const [selectedItemId, setSelectedItemId] = useState("");
  const [borrowerName, setBorrowerName] = useState("");
  const [role, setRole] = useState<"Student" | "Instructor">("Student");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");

  const handleReturn = (id: string) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "returned" } : item
      )
    );
  };

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId || !borrowerName || !expectedReturnDate) {
      alert("Please fill in all telemetry details.");
      return;
    }

    const item = MOCK_INVENTORY.find((i) => i.id === selectedItemId);
    if (!item) return;

    const newAssignment: Assignment = {
      id: `ASG-${Math.floor(100 + Math.random() * 900)}`,
      itemId: selectedItemId,
      itemName: item.name,
      borrowerName,
      role,
      borrowDate: new Date().toISOString().split("T")[0],
      expectedReturnDate,
      status: "active",
    };

    setAssignments((prev) => [newAssignment, ...prev]);
    
    // Reset Form
    setSelectedItemId("");
    setBorrowerName("");
    setRole("Student");
    setExpectedReturnDate("");
    setShowAssignForm(false);
  };

  // Metrics
  const activeAssignments = assignments.filter((a) => a.status === "active").length;
  const overdueAssignments = assignments.filter((a) => a.status === "overdue").length;
  const returnedAssignments = assignments.filter((a) => a.status === "returned").length;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Custody Handover Hub
            <span className="text-xs bg-neon-purple/10 border border-neon-purple/35 text-neon-purple font-mono px-2 py-0.5 rounded-full font-bold">
              Active Leases
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Authorise and log micro-controller loans or 3D printer slot custody handovers.
          </p>
        </div>
        
        <button
          onClick={() => setShowAssignForm(!showAssignForm)}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono rounded-xl border border-neon-purple/40 hover:border-neon-purple bg-neon-purple/5 hover:bg-neon-purple/10 text-neon-purple transition-all cursor-pointer"
        >
          {showAssignForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          {showAssignForm ? "Cancel Authorization" : "Authorize New Lease"}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Active Handovers"
          value={activeAssignments}
          change="Currently out of vault"
          changeType="neutral"
          icon={Cpu}
          themeColor="cyan"
        />
        <StatCard
          title="Overdue Returns"
          value={overdueAssignments}
          change="Requires system follow-up"
          changeType={overdueAssignments > 0 ? "decrease" : "neutral"}
          icon={AlertTriangle}
          themeColor="amber"
        />
        <StatCard
          title="Returned Safely"
          value={returnedAssignments}
          change="Total logged this term"
          changeType="neutral"
          icon={CheckCircle2}
          themeColor="emerald"
        />
      </div>

      {/* Form Card */}
      {showAssignForm && (
        <GlassCard glowColor="purple" className="max-w-xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-neon-purple animate-pulse" />
            Lease Authorization Request
          </h3>
          <form onSubmit={handleAssign} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Select Hardware Model</label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-neon-purple"
                required
              >
                <option value="">-- Choose Item from Vault --</option>
                {MOCK_INVENTORY.filter(i => i.availableQty > 0).map(i => (
                  <option key={i.id} value={i.id}>
                    {i.name} ({i.availableQty} available at {i.location})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Borrower Name (Algerian)</label>
                <input
                  type="text"
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  placeholder="e.g. Amine Bouaziz"
                  className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-neon-purple"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Borrower Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-neon-purple"
                >
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1">Expected Return Date</label>
              <input
                type="date"
                value={expectedReturnDate}
                onChange={(e) => setExpectedReturnDate(e.target.value)}
                className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-neon-purple"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neon-purple text-white font-bold p-3 rounded-xl hover:bg-neon-purple/90 transition-colors shadow-lg cursor-pointer"
            >
              Sign Authorization Protocol
            </button>
          </form>
        </GlassCard>
      )}

      {/* Custody Listing */}
      <GlassCard hoverable={false}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Active Leased Equipment Ledger</h4>
            <p className="text-xs text-gray-500 font-mono uppercase mt-0.5">Real-time custody tracking and returns</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                <th className="pb-3 font-semibold">Lease ID</th>
                <th className="pb-3 font-semibold">Borrowed Item</th>
                <th className="pb-3 font-semibold">Borrower</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Lease Date</th>
                <th className="pb-3 font-semibold">Return Deadline</th>
                <th className="pb-3 font-semibold text-center">Status</th>
                <th className="pb-3 font-semibold text-center">Protocol Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {assignments.map((asg) => (
                <tr key={asg.id} className="hover:bg-obsidian-900/40 transition-colors">
                  <td className="py-3.5 font-mono text-gray-400 font-semibold">{asg.id}</td>
                  <td className="py-3.5 font-bold text-white max-w-[180px] truncate">{asg.itemName}</td>
                  <td className="py-3.5 text-gray-300 font-bold">{asg.borrowerName}</td>
                  <td className="py-3.5 text-gray-400 font-semibold">{asg.role}</td>
                  <td className="py-3.5 font-mono text-gray-400">{asg.borrowDate}</td>
                  <td className="py-3.5 font-mono text-gray-400">{asg.expectedReturnDate}</td>
                  <td className="py-3.5 text-center">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold border capitalize",
                        asg.status === "active" && "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan",
                        asg.status === "overdue" && "bg-neon-red/5 border-neon-red/20 text-neon-red animate-pulse",
                        asg.status === "returned" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow"
                      )}
                    >
                      {asg.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-center">
                    {asg.status !== "returned" ? (
                      <button
                        onClick={() => handleReturn(asg.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-emerald-glow/20 hover:border-emerald-glow bg-emerald-glow/5 hover:bg-emerald-glow/10 text-emerald-glow text-[10px] font-bold transition-all cursor-pointer"
                      >
                        Log Return
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-gray-500 font-bold">ARCHIVED</span>
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
