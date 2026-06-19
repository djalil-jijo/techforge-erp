"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FileText, Search, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeacherReport {
  id: string;
  teacherName: string;
  date: string;
  summary: string;
  hardwareStatus: string;
  status: "Reviewed" | "Pending Audit";
}

const MOCK_REPORTS: TeacherReport[] = [
  { id: "REP-401", teacherName: "Prof. Lamine Touati", date: "2026-06-18", summary: "Completed introduction to linear actuators. 2 stepper drivers required calibration.", hardwareStatus: "All tools returned except 1 driver sent for checkup", status: "Pending Audit" },
  { id: "REP-402", teacherName: "Dr. Meriem Bella", date: "2026-06-17", summary: "Circuits lab. Soldering workshop completed safely. Students constructed 5 astable circuits.", hardwareStatus: "TS100 irons stored in Cabinet 2", status: "Reviewed" },
  { id: "REP-403", teacherName: "Ing. Jamel Djaoued", date: "2026-06-16", summary: "IoT Gateway session. Connected ESP32 nodes to local Mosquitto broker successfully.", hardwareStatus: "All dev kits verified and locked in B-3", status: "Reviewed" },
];

export default function ReportsAudit() {
  const [reports, setReports] = useState<TeacherReport[]>(MOCK_REPORTS);

  const handleAudit = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Reviewed" } : r))
    );
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Report Audit Room
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-2 py-0.5 rounded-full font-bold">
            Auditing Core
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Verify digital lesson logs and check-in equipment status remarks reported by teachers.
        </p>
      </div>

      {/* Reports list */}
      <div className="space-y-6">
        {reports.map((report) => (
          <GlassCard 
            key={report.id} 
            className="p-6 border border-obsidian-800 space-y-4"
            glowColor={report.status === "Pending Audit" ? "cyan" : "none"}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyber-cyan" />
                <div>
                  <h4 className="font-bold text-white text-sm">{report.teacherName}</h4>
                  <span className="text-[10px] text-gray-500 font-mono">{report.date} • {report.id}</span>
                </div>
              </div>
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold border",
                  report.status === "Pending Audit" 
                    ? "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan animate-pulse" 
                    : "bg-gray-500/5 border-gray-500/20 text-gray-400"
                )}
              >
                {report.status}
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-gray-300 bg-obsidian-950/40 p-4 rounded-xl border border-obsidian-850">
              <p>
                <strong className="text-white block mb-0.5 font-bold">Session Briefing:</strong>
                {report.summary}
              </p>
              <p className="border-t border-obsidian-850 pt-2.5">
                <strong className="text-laser-amber block mb-0.5 font-mono text-[10px] uppercase">Hardware Vault Log:</strong>
                {report.hardwareStatus}
              </p>
            </div>

            {report.status === "Pending Audit" && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleAudit(report.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyber-cyan text-obsidian-950 text-xs font-bold hover:bg-cyber-cyan/90 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Sign Off Audit Protocol
                </button>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
