"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Trophy, Zap, BookOpen, Star, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGES = [
  { name: "First Circuit Built", icon: "⚡", earned: true, date: "2026-03-15", color: "text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/5" },
  { name: "Solder Master", icon: "🔥", earned: true, date: "2026-04-02", color: "text-laser-amber border-laser-amber/30 bg-laser-amber/5" },
  { name: "Robot Programmer", icon: "🤖", earned: true, date: "2026-05-20", color: "text-emerald-glow border-emerald-glow/30 bg-emerald-glow/5" },
  { name: "3D Print Veteran", icon: "🖨️", earned: false, date: null, color: "text-gray-600 border-obsidian-800 bg-obsidian-950" },
  { name: "Hackathon Finalist", icon: "🏆", earned: false, date: null, color: "text-gray-600 border-obsidian-800 bg-obsidian-950" },
  { name: "CNC Operator", icon: "⚙️", earned: false, date: null, color: "text-gray-600 border-obsidian-800 bg-obsidian-950" },
];

const SKILL_PROGRESS = [
  { name: "Programming Logic", level: 82, color: "bg-cyber-cyan" },
  { name: "Circuit Assembly", level: 75, color: "bg-neon-purple" },
  { name: "Soldering Skills", level: 90, color: "bg-laser-amber" },
  { name: "3D Design", level: 45, color: "bg-emerald-glow" },
  { name: "Team Collaboration", level: 88, color: "bg-cyber-cyan" },
];

export default function PortalDashboard() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          My Achievement Hub
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-2 py-0.5 rounded-full font-bold pulse-cyan">
            Live Progress
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Track your FabLab journey — skills, badges, and academic performance.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Attendance Rate" value="92%" change="+4% this month" changeType="increase" icon={CheckCircle2} themeColor="emerald" />
        <StatCard title="Badges Earned" value="3 / 6" change="Keep going!" changeType="neutral" icon={Award} themeColor="purple" />
        <StatCard title="Overall Level" value="Advanced" change="Robotics Track" changeType="neutral" icon={Star} themeColor="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievement Badges */}
        <GlassCard hoverable={false} className="space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-laser-amber" />
            Achievement Badges
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {BADGES.map((badge, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl border text-center transition-all",
                  badge.color,
                  !badge.earned && "opacity-40 grayscale"
                )}
              >
                <span className="text-2xl mb-1.5">{badge.icon}</span>
                <p className="text-[10px] font-bold leading-tight">{badge.name}</p>
                {badge.earned && badge.date && (
                  <p className="text-[9px] text-gray-500 font-mono mt-1">{badge.date}</p>
                )}
                {!badge.earned && (
                  <p className="text-[9px] text-gray-600 font-mono mt-1">LOCKED</p>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Skills Radar */}
        <GlassCard hoverable={false} className="space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyber-cyan" />
            Skills Proficiency Matrix
          </h3>
          <div className="space-y-4">
            {SKILL_PROGRESS.map((skill, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold">{skill.name}</span>
                  <span className="font-mono font-bold text-white">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-obsidian-950 rounded-full overflow-hidden border border-obsidian-800">
                  <div
                    className={cn("h-full rounded-full transition-all duration-700", skill.color)}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
