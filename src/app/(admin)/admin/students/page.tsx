"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Search, Filter, Users, GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  track: "Robotics" | "Electronics" | "3D Printing";
  level: "Beginner" | "Intermediate" | "Advanced";
  parent: string;
  parentPhone: string;
  attendance: number; // percentage
  status: "Active" | "Suspended" | "Completed";
}

const MOCK_STUDENTS: Student[] = [
  { id: "STU-801", name: "Amine Bouaziz", track: "Robotics", level: "Advanced", parent: "Mohamed Bouaziz", parentPhone: "0660 78 90 12", attendance: 92, status: "Active" },
  { id: "STU-802", name: "Yasmine Haddad", track: "3D Printing", level: "Intermediate", parent: "Omar Haddad", parentPhone: "0555 12 34 56", attendance: 88, status: "Active" },
  { id: "STU-803", name: "Karim Benamar", track: "Electronics", level: "Beginner", parent: "Zoubir Benamar", parentPhone: "0770 45 67 89", attendance: 95, status: "Active" },
  { id: "STU-804", name: "Sara Merabet", track: "Robotics", level: "Advanced", parent: "Rachid Merabet", parentPhone: "0560 33 22 11", attendance: 75, status: "Active" },
  { id: "STU-805", name: "Anis Merah", track: "Robotics", level: "Intermediate", parent: "Tayeb Merah", parentPhone: "0662 99 88 77", attendance: 64, status: "Suspended" },
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [trackFilter, setTrackFilter] = useState("All");

  const filteredStudents = MOCK_STUDENTS.filter((stu) => {
    const matchesSearch = stu.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          stu.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrack = trackFilter === "All" || stu.track === trackFilter;
    return matchesSearch && matchesTrack;
  });

  const totalActive = MOCK_STUDENTS.filter(s => s.status === "Active").length;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Student Registries
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-2 py-0.5 rounded-full font-bold">
            Database Core
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Access comprehensive member details, guardian links, and attendance ratios.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Registered"
          value={MOCK_STUDENTS.length}
          change="All-time members"
          changeType="neutral"
          icon={Users}
          themeColor="cyan"
        />
        <StatCard
          title="Active Profiles"
          value={totalActive}
          change="Currently attending classes"
          changeType="increase"
          icon={GraduationCap}
          themeColor="emerald"
        />
        <StatCard
          title="Avg Attendance Rate"
          value="82.8%"
          change="Current term score"
          changeType="neutral"
          icon={Award}
          themeColor="purple"
        />
      </div>

      {/* Database View */}
      <GlassCard className="space-y-6" hoverable={false}>
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student names, IDs or parents..."
              className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div className="flex items-center gap-2 bg-obsidian-950 px-3 py-2 rounded-xl border border-obsidian-850">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value)}
              className="bg-transparent text-xs text-gray-300 focus:outline-none cursor-pointer pr-4 font-bold"
            >
              <option value="All" className="bg-obsidian-950">All Tracks</option>
              <option value="Robotics" className="bg-obsidian-950">Robotics</option>
              <option value="Electronics" className="bg-obsidian-950">Electronics</option>
              <option value="3D Printing" className="bg-obsidian-950">3D Printing</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                <th className="pb-3 font-semibold">Student ID</th>
                <th className="pb-3 font-semibold">Full Name</th>
                <th className="pb-3 font-semibold">Track Path</th>
                <th className="pb-3 font-semibold">Skill Level</th>
                <th className="pb-3 font-semibold">Parent / Contact</th>
                <th className="pb-3 font-semibold text-center">Attendance</th>
                <th className="pb-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {filteredStudents.map((stu) => (
                <tr key={stu.id} className="hover:bg-obsidian-900/40 transition-colors">
                  <td className="py-3.5 font-mono text-gray-400 font-semibold">{stu.id}</td>
                  <td className="py-3.5 font-bold text-white">{stu.name}</td>
                  <td className="py-3.5 text-gray-300">
                    <span className="px-2 py-0.5 rounded-md bg-obsidian-850 border border-obsidian-800 text-[10px] font-bold">
                      {stu.track}
                    </span>
                  </td>
                  <td className="py-3.5 text-gray-400 font-semibold">{stu.level}</td>
                  <td className="py-3.5 text-gray-300">
                    <span className="block font-bold">{stu.parent}</span>
                    <span className="block text-[10px] text-gray-500 font-mono mt-0.5">{stu.parentPhone}</span>
                  </td>
                  <td className="py-3.5 text-center font-mono font-bold text-cyber-cyan">{stu.attendance}%</td>
                  <td className="py-3.5 text-center">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold border",
                        stu.status === "Active" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow",
                        stu.status === "Suspended" && "bg-neon-red/5 border-neon-red/20 text-neon-red animate-pulse",
                        stu.status === "Completed" && "bg-gray-500/5 border-gray-500/20 text-gray-400"
                      )}
                    >
                      {stu.status}
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
