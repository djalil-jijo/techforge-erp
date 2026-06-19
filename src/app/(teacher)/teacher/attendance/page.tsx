"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { CheckCircle2, XCircle, Clock, Users, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type AttendanceStatus = "present" | "absent" | "late" | "unset";

interface AttendanceRecord {
  id: string;
  name: string;
  status: AttendanceStatus;
}

const INITIAL_STUDENTS: AttendanceRecord[] = [
  { id: "STU-801", name: "Amine Bouaziz", status: "unset" },
  { id: "STU-802", name: "Yasmine Haddad", status: "unset" },
  { id: "STU-803", name: "Karim Benamar", status: "unset" },
  { id: "STU-804", name: "Sara Merabet", status: "unset" },
  { id: "STU-805", name: "Anis Merah", status: "unset" },
  { id: "STU-806", name: "Meriem Bella", status: "unset" },
  { id: "STU-807", name: "Fatma Zohra Cherif", status: "unset" },
  { id: "STU-808", name: "Abdessalam Khelil", status: "unset" },
];

export default function AttendanceRegister() {
  const [students, setStudents] = useState<AttendanceRecord[]>(INITIAL_STUDENTS);
  const [submitted, setSubmitted] = useState(false);
  const [sessionInfo, setSessionInfo] = useState({ subject: "Linear Actuators Lab", date: new Date().toISOString().split("T")[0] });

  const setStatus = (id: string, status: AttendanceStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const markAll = (status: AttendanceStatus) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  const handleSubmit = () => {
    const unset = students.filter(s => s.status === "unset").length;
    if (unset > 0) {
      if (!confirm(`${unset} student(s) are unrecorded. Submit anyway?`)) return;
    }
    setSubmitted(true);
  };

  const present = students.filter(s => s.status === "present").length;
  const absent = students.filter(s => s.status === "absent").length;
  const late = students.filter(s => s.status === "late").length;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Attendance Register
            <span className="text-xs bg-emerald-glow/10 border border-emerald-glow/35 text-emerald-glow font-mono px-2 py-0.5 rounded-full font-bold">
              Live Session
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Mark student presence for <strong className="text-white">{sessionInfo.subject}</strong> — {sessionInfo.date}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => markAll("present")} className="px-3 py-2 text-xs font-bold rounded-xl border border-emerald-glow/30 bg-emerald-glow/5 text-emerald-glow hover:bg-emerald-glow/10 transition-all cursor-pointer">
            Mark All Present
          </button>
          <button onClick={() => markAll("absent")} className="px-3 py-2 text-xs font-bold rounded-xl border border-neon-red/30 bg-neon-red/5 text-neon-red hover:bg-neon-red/10 transition-all cursor-pointer">
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Present" value={present} change={`out of ${students.length}`} changeType="increase" icon={CheckCircle2} themeColor="emerald" />
        <StatCard title="Absent" value={absent} change={`out of ${students.length}`} changeType={absent > 0 ? "decrease" : "neutral"} icon={XCircle} themeColor="purple" />
        <StatCard title="Late Arrivals" value={late} change="Tardy records" changeType="neutral" icon={Clock} themeColor="amber" />
      </div>

      {submitted ? (
        <GlassCard glowColor="emerald" className="text-center py-12 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-glow/10 border border-emerald-glow/30 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-emerald-glow" />
          </div>
          <h3 className="text-xl font-bold text-white">Attendance Protocol Submitted</h3>
          <p className="text-gray-400 text-xs">Session register for <strong className="text-white">{sessionInfo.subject}</strong> has been committed to the student registry ledger.</p>
          <button onClick={() => setSubmitted(false)} className="mt-2 px-5 py-2 bg-emerald-glow text-obsidian-950 font-bold rounded-xl text-xs cursor-pointer hover:bg-emerald-glow/90">
            New Session
          </button>
        </GlassCard>
      ) : (
        <GlassCard hoverable={false} className="space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Student Attendance Grid</h3>
          <div className="space-y-3">
            {students.map((student) => (
              <div key={student.id} className={cn(
                "flex items-center justify-between p-4 rounded-xl border transition-all",
                student.status === "present" && "bg-emerald-glow/5 border-emerald-glow/20",
                student.status === "absent" && "bg-neon-red/5 border-neon-red/20",
                student.status === "late" && "bg-laser-amber/5 border-laser-amber/20",
                student.status === "unset" && "bg-obsidian-900/40 border-obsidian-800"
              )}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-obsidian-850 border border-obsidian-800 flex items-center justify-center text-xs font-bold text-white">
                    {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{student.name}</p>
                    <p className="text-[10px] text-gray-500 font-mono">{student.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {(["present", "late", "absent"] as AttendanceStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(student.id, s)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer capitalize",
                        student.status === s && s === "present" && "bg-emerald-glow border-emerald-glow text-obsidian-950",
                        student.status === s && s === "absent" && "bg-neon-red border-neon-red text-white",
                        student.status === s && s === "late" && "bg-laser-amber border-laser-amber text-obsidian-950",
                        student.status !== s && "bg-obsidian-950 border-obsidian-800 text-gray-500 hover:border-obsidian-750"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-obsidian-800 flex justify-end">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 bg-cyber-cyan text-obsidian-950 font-bold rounded-xl text-xs hover:bg-cyber-cyan/90 transition-colors cursor-pointer shadow-lg"
            >
              <ShieldCheck className="w-4 h-4" />
              Commit Attendance Log
            </button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
