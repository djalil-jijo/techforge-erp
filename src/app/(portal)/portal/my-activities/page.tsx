"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Trophy, Cpu, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const MY_COMPETITIONS = [
  {
    id: "COMP-001",
    name: "Algerian Robotics Cup 2026",
    scope: "National",
    role: "Team Lead",
    team: ["Amine Bouaziz", "Sara Merabet", "Karim Benamar"],
    project: "Smart Irrigation Drone",
    status: "registered",
    date: "2026-07-24",
  },
  {
    id: "COMP-003",
    name: "Eurobot Challenge 2026",
    scope: "International",
    role: "Programmer",
    team: ["Amine Bouaziz", "Yasmine Haddad"],
    project: "Autonomous Chess Robot",
    status: "completed",
    date: "2026-05-15",
    result: "Finalist — Top 8",
  },
];

const MY_PROJECTS = [
  { id: "PRJ-101", title: "Algerian Smart Agri-Drone", track: "Robotics", progress: 65, status: "prototyping" },
  { id: "PRJ-102", title: "Autonomous Chess Robot", track: "AI / Software", progress: 100, status: "completed" },
];

export default function MyActivities() {
  return (
    <div className="space-y-8">
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          My Activities
          <span className="text-xs bg-neon-red/10 border border-neon-red/35 text-neon-red font-mono px-2 py-0.5 rounded-full font-bold">
            Competitions Radar
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Track competitions you represent and projects you are building at TechForge FabLab.</p>
      </div>

      {/* Competitions */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-neon-purple" />
          Competitions I Represent
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MY_COMPETITIONS.map((comp) => (
            <GlassCard
              key={comp.id}
              glowColor={comp.status === "registered" ? "purple" : "emerald"}
              className="p-6 space-y-4 border border-obsidian-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase">{comp.id} • {comp.scope}</p>
                  <h4 className="text-sm font-bold text-white mt-1">{comp.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">My Role: <span className="text-white font-bold">{comp.role}</span></p>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold border flex-shrink-0",
                  comp.status === "registered" ? "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan" : "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow"
                )}>
                  {comp.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-gray-400">Project: <span className="text-white font-bold">{comp.project}</span></p>
                <div className="flex flex-wrap gap-1.5">
                  {comp.team.map((m, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-obsidian-900 border border-obsidian-800 text-gray-400">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {comp.result && (
                <div className="p-2.5 rounded-xl bg-emerald-glow/5 border border-emerald-glow/20 flex items-center gap-2 text-xs">
                  <Star className="w-4 h-4 text-laser-amber fill-laser-amber" />
                  <span className="font-bold text-emerald-glow">{comp.result}</span>
                </div>
              )}

              <p className="text-[10px] text-gray-500 font-mono">Date: {comp.date}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* FabLab Projects */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyber-cyan" />
          My FabLab Projects
        </h3>

        <div className="space-y-4">
          {MY_PROJECTS.map((proj) => (
            <GlassCard key={proj.id} hoverable={false} className="p-5 space-y-3 border border-obsidian-800">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-mono text-gray-500">{proj.id} • {proj.track}</p>
                  <h4 className="text-sm font-bold text-white mt-0.5">{proj.title}</h4>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                  proj.status === "completed" ? "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow" : "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan"
                )}>
                  {proj.status}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>Build Progress</span>
                  <span>{proj.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-obsidian-950 rounded-full overflow-hidden border border-obsidian-800">
                  <div
                    className={cn("h-full transition-all duration-700", proj.progress === 100 ? "bg-emerald-glow" : "bg-cyber-cyan")}
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
