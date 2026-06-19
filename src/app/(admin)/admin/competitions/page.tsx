"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Award, Trophy, Users, Star, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Competition {
  id: string;
  name: string;
  scope: "National" | "International" | "Local";
  date: string;
  teamsCount: number;
  status: "Registration" | "Active" | "Completed";
  location: string;
}

const MOCK_COMPS: Competition[] = [
  { id: "COMP-001", name: "Algerian Robotics Cup 2026", scope: "National", date: "2026-07-24", teamsCount: 3, status: "Registration", location: "Algiers Dome" },
  { id: "COMP-002", name: "NASA Space Apps Challenge Biskra", scope: "Local", date: "2026-10-02", teamsCount: 2, status: "Registration", location: "TechForge Hub" },
  { id: "COMP-003", name: "Eurobot Challenge 2026", scope: "International", date: "2026-05-15", teamsCount: 1, status: "Completed", location: "Paris, France" },
];

export default function Competitions() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Hackathons Radar
            <span className="text-xs bg-neon-purple/10 border border-neon-purple/35 text-neon-purple font-mono px-2 py-0.5 rounded-full font-bold">
              Competitions Panel
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Form student teams, coordinate contest submissions, and track international robotics rankings.
          </p>
        </div>

        <button 
          onClick={() => alert("New Competition Registry initiated.")}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono rounded-xl border border-neon-purple/40 hover:border-neon-purple bg-neon-purple/5 hover:bg-neon-purple/10 text-neon-purple transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Contest Entry
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Active Contests"
          value={MOCK_COMPS.filter(c => c.status !== "Completed").length}
          change="Open registrations"
          changeType="neutral"
          icon={Trophy}
          themeColor="purple"
        />
        <StatCard
          title="Registered Teams"
          value="6 Teams"
          change="Total students participating"
          changeType="neutral"
          icon={Users}
          themeColor="cyan"
        />
        <StatCard
          title="Championship Medals"
          value="4 Gold"
          change="All-time award records"
          changeType="increase"
          icon={Award}
          themeColor="emerald"
        />
      </div>

      {/* Contests list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_COMPS.map((c) => (
          <GlassCard 
            key={c.id} 
            className="p-6 relative overflow-hidden flex flex-col justify-between h-48 border border-obsidian-800"
            glowColor={c.status === "Registration" ? "purple" : "none"}
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{c.id} • {c.scope}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                    c.status === "Registration" && "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan",
                    c.status === "Active" && "bg-laser-amber/5 border-laser-amber/20 text-laser-amber animate-pulse",
                    c.status === "Completed" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow"
                  )}
                >
                  {c.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-2 flex items-center gap-2">
                <Trophy className="w-4.5 h-4.5 text-neon-purple" />
                {c.name}
              </h3>
              <p className="text-gray-400 text-xs mt-1 font-semibold">{c.location} • Contest Date: {c.date}</p>
            </div>

            <div className="border-t border-obsidian-850 pt-3 flex items-center justify-between text-[10px] font-mono">
              <span className="text-gray-500 uppercase">ACTIVE ENGAGEMENTS:</span>
              <span className="text-neon-purple font-bold">{c.teamsCount} Teams registered</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
