"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Search, ShieldCheck, Mail, BookOpen, Layers } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  specialty: string;
  email: string;
  assignedFouj: string; // assigned classes
  reportsCount: number;
  contract: "Full-Time" | "Part-Time" | "Consultant";
}

const MOCK_TEACHERS: Teacher[] = [
  { id: "TCH-001", name: "Prof. Lamine Touati", specialty: "SCARA Robotics & CNC Coding", email: "lamine@techforge.dz", assignedFouj: "Fouj A-1, B-2", reportsCount: 15, contract: "Full-Time" },
  { id: "TCH-002", name: "Dr. Meriem Bella", specialty: "Analog Circuits & PCB Millers", email: "meriem@techforge.dz", assignedFouj: "Fouj C-3, C-4", reportsCount: 12, contract: "Part-Time" },
  { id: "TCH-003", name: "Ing. Jamel Djaoued", specialty: "IoT Core & Smart Automation", email: "jamel@techforge.dz", assignedFouj: "Fouj E-1", reportsCount: 18, contract: "Full-Time" },
  { id: "TCH-004", name: "Anis Merah", specialty: "Embedded Systems Labs", email: "anis@techforge.dz", assignedFouj: "Fouj A-2", reportsCount: 6, contract: "Consultant" },
];

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = MOCK_TEACHERS.filter((tch) => {
    return tch.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           tch.specialty.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Instructors Roster
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-2 py-0.5 rounded-full font-bold">
            Staff Ledger
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Monitor instructor profiles, teaching specialties, and active lesson logs.
        </p>
      </div>

      {/* Roster database */}
      <GlassCard className="space-y-6" hoverable={false}>
        <div className="flex justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by instructor name or specialty..."
              className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                <th className="pb-3 font-semibold">Staff ID</th>
                <th className="pb-3 font-semibold">Instructor</th>
                <th className="pb-3 font-semibold">Specialty Domain</th>
                <th className="pb-3 font-semibold">Assigned Fouj</th>
                <th className="pb-3 font-semibold text-center">Reports Filed</th>
                <th className="pb-3 font-semibold text-center">Contract Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {filteredTeachers.map((tch) => (
                <tr key={tch.id} className="hover:bg-obsidian-900/40 transition-colors">
                  <td className="py-3.5 font-mono text-gray-400 font-semibold">{tch.id}</td>
                  <td className="py-3.5 text-white">
                    <span className="block font-bold">{tch.name}</span>
                    <span className="block text-[10px] text-gray-500 font-mono mt-0.5">{tch.email}</span>
                  </td>
                  <td className="py-3.5 text-gray-300 font-semibold">{tch.specialty}</td>
                  <td className="py-3.5 text-gray-400 font-mono">{tch.assignedFouj}</td>
                  <td className="py-3.5 text-center font-mono text-cyber-cyan font-bold">{tch.reportsCount} logs</td>
                  <td className="py-3.5 text-center">
                    <span className="px-2 py-0.5 rounded-md bg-obsidian-800 border border-obsidian-750 text-[10px] font-bold text-laser-amber">
                      {tch.contract}
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
