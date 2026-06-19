"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Calendar, AlertOctagon, HelpCircle, RefreshCw, Cpu, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slot {
  id: string;
  time: string;
  classRoom: string;
  instructor: string;
  hardwareRequested: string;
  qtyRequested: number;
  qtyAvailableInVault: number;
  conflict: boolean;
  conflictDetails?: string;
}

const MOCK_SLOTS: Slot[] = [
  {
    id: "SLT-01",
    time: "09:00 - 11:00",
    classRoom: "Robotics Deck A",
    instructor: "Prof. Lamine Touati",
    hardwareRequested: "Arduino Uno Kits",
    qtyRequested: 15,
    qtyAvailableInVault: 18,
    conflict: false,
  },
  {
    id: "SLT-02",
    time: "11:00 - 13:00",
    classRoom: "Central FabLab",
    instructor: "Dr. Meriem Bella",
    hardwareRequested: "Creality Ender-3 3D Printers",
    qtyRequested: 6,
    qtyAvailableInVault: 5,
    conflict: true,
    conflictDetails: "Capacity Deficit: 6 units requested for printing, only 5 units registered in Vault A-1.",
  },
  {
    id: "SLT-03",
    time: "14:00 - 16:00",
    classRoom: "IoT Circuits Deck B",
    instructor: "Ing. Jamel Djaoued",
    hardwareRequested: "TS100 Smart Soldering Irons",
    qtyRequested: 10,
    qtyAvailableInVault: 12,
    conflict: false,
  },
  {
    id: "SLT-04",
    time: "16:00 - 18:00",
    classRoom: "Central FabLab",
    instructor: "Prof. Lamine Touati",
    hardwareRequested: "CNC 3018 Pro Engraver",
    qtyRequested: 3,
    qtyAvailableInVault: 2,
    conflict: true,
    conflictDetails: "Conflict: 3 routers requested for slot, only 2 units registered in Central Vault.",
  },
];

export default function TimetableScheduler() {
  const [slots, setSlots] = useState<Slot[]>(MOCK_SLOTS);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "done">("idle");

  const runConflictScan = () => {
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("done");
    }, 1200);
  };

  const conflictsCount = slots.filter((s) => s.conflict).length;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Dynamic Matrix Scheduler
            <span className="text-xs bg-laser-amber/10 border border-laser-amber/35 text-laser-amber font-mono px-2 py-0.5 rounded-full font-bold">
              Conflict Engine
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Resolve room slots and audit hardware allocations to prevent device deficit locks.
          </p>
        </div>

        <button
          onClick={runConflictScan}
          disabled={scanStatus === "scanning"}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono rounded-xl border border-laser-amber/40 hover:border-laser-amber bg-laser-amber/5 hover:bg-laser-amber/10 text-laser-amber transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", scanStatus === "scanning" && "animate-spin")} />
          {scanStatus === "scanning" ? "Auditing Vault Stocks..." : "Execute Conflict Scan"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Scheduled Slots"
          value={slots.length}
          change="Today's session plans"
          changeType="neutral"
          icon={Calendar}
          themeColor="cyan"
        />
        <StatCard
          title="Hardware Deficiency Alerts"
          value={conflictsCount}
          change={conflictsCount > 0 ? "Requires schedule adjustment" : "No conflicts detected"}
          changeType={conflictsCount > 0 ? "decrease" : "neutral"}
          icon={AlertOctagon}
          themeColor={conflictsCount > 0 ? "purple" : "emerald"}
        />
        <StatCard
          title="Avg Hardware Load"
          value="72%"
          change="Active vault query level"
          changeType="neutral"
          icon={Cpu}
          themeColor="emerald"
        />
      </div>

      {/* Conflict Warnings (Visible in Red Alerts) */}
      {conflictsCount > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-neon-red font-mono uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-red animate-ping" />
            CRITICAL MATRIX DEFICIT DETECTED
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.filter(s => s.conflict).map(slot => (
              <div 
                key={slot.id} 
                className="p-5 rounded-2xl bg-neon-red/5 border-2 border-neon-red/30 glow-border-red/25 flex gap-4 text-xs"
              >
                <AlertOctagon className="w-6 h-6 text-neon-red animate-pulse flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-bold text-white font-mono">{slot.time} • {slot.classRoom}</h4>
                  <p className="text-gray-400 font-semibold">{slot.conflictDetails}</p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    REQUESTED: {slot.qtyRequested} units of {slot.hardwareRequested} • AVAIL: {slot.qtyAvailableInVault}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scheduler Slots Table */}
      <GlassCard hoverable={false}>
        <h4 className="text-lg font-bold text-white mb-6">Today's Allocation Matrix</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                <th className="pb-3 font-semibold">Slot ID</th>
                <th className="pb-3 font-semibold">Time Window</th>
                <th className="pb-3 font-semibold">Room / Lab</th>
                <th className="pb-3 font-semibold">Instructor</th>
                <th className="pb-3 font-semibold">Requested Parts</th>
                <th className="pb-3 font-semibold text-center">Qty Required</th>
                <th className="pb-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {slots.map((slot) => (
                <tr key={slot.id} className={cn("hover:bg-obsidian-900/40 transition-colors", slot.conflict && "bg-neon-red/5 hover:bg-neon-red/10")}>
                  <td className="py-3.5 font-mono text-gray-400 font-semibold">{slot.id}</td>
                  <td className="py-3.5 text-white font-mono font-bold">{slot.time}</td>
                  <td className="py-3.5 text-gray-300 font-semibold">{slot.classRoom}</td>
                  <td className="py-3.5 text-gray-400 font-semibold">{slot.instructor}</td>
                  <td className="py-3.5 text-gray-300 font-mono">{slot.hardwareRequested}</td>
                  <td className="py-3.5 text-center font-mono font-bold text-cyber-cyan">{slot.qtyRequested}</td>
                  <td className="py-3.5 text-center">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold border",
                        slot.conflict 
                          ? "bg-neon-red/5 border-neon-red/35 text-neon-red font-bold" 
                          : "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow"
                      )}
                    >
                      {slot.conflict ? "Conflict Locked" : "Authorized"}
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
