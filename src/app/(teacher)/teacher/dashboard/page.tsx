"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Calendar, Users, Cpu, FileWarning, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeacherDashboard() {
  const schedule = [
    { time: "09:00 - 11:00", room: "Robotics Deck A", subject: "Linear Actuators Lab", students: 15, status: "completed" },
    { time: "16:00 - 18:00", room: "Central FabLab", subject: "CNC PCB Engraving", students: 12, status: "pending" },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Daily Overview
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-2 py-0.5 rounded-full font-bold">
            Staff Deck
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Monitor scheduled sessions, check student capacities, and register lesson logs.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Scheduled Hours"
          value="4 Hours"
          change="Today's load"
          changeType="neutral"
          icon={Calendar}
          themeColor="cyan"
        />
        <StatCard
          title="Total Student Load"
          value="27 Students"
          change="Allocated in slots"
          changeType="neutral"
          icon={Users}
          themeColor="emerald"
        />
        <StatCard
          title="Borrowed Hardware Items"
          value="4 Models"
          change="Checked out of Vault"
          changeType="neutral"
          icon={Cpu}
          themeColor="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Schedule Roster */}
        <GlassCard className="lg:col-span-2 space-y-6" hoverable={false}>
          <h3 className="text-base font-bold text-white">Today's Class Timetable</h3>
          <div className="space-y-4 text-xs">
            {schedule.map((item, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-obsidian-900/50 border border-obsidian-850 hover:border-obsidian-800 transition-all flex justify-between items-center"
              >
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-gray-500 block uppercase">{item.time} • {item.room}</span>
                  <h4 className="font-bold text-white text-sm">{item.subject}</h4>
                  <p className="text-gray-400 font-semibold">{item.students} Students registered</p>
                </div>

                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold border capitalize",
                    item.status === "completed" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow",
                    item.status === "pending" && "bg-laser-amber/5 border-laser-amber/20 text-laser-amber"
                  )}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Admin alerts */}
        <GlassCard glowColor="cyan" hoverable={false}>
          <div className="flex items-center gap-2 mb-4">
            <FileWarning className="w-5 h-5 text-cyber-cyan" />
            <h3 className="text-base font-bold text-white">Staff Alerts</h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-obsidian-900/50 border border-obsidian-850">
              <span className="text-[10px] font-mono text-laser-amber font-bold block mb-1">HARDWARE NOTICE</span>
              <p className="text-gray-400 leading-relaxed font-semibold">
                CNC PCB engraving router has scheduled maintenance slots between 13:00 - 15:00.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-obsidian-900/50 border border-obsidian-850">
              <span className="text-[10px] font-mono text-cyber-cyan font-bold block mb-1">REGISTRY PROTOCOL</span>
              <p className="text-gray-400 leading-relaxed font-semibold">
                Submit lesson reports within 24 hours of session end for automatic student progress logs.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
