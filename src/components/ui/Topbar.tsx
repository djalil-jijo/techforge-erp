"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const notifications = [
    {
      id: 1,
      title: "Device Offline Alert",
      desc: "CNC 3018 Router has lost signal or was shut down.",
      time: "5 mins ago",
      type: "error",
    },
    {
      id: 2,
      title: "Custody Overdue",
      desc: "Anis Merah is late returning Arduino Starter Kit.",
      time: "2 hours ago",
      type: "warning",
    },
    {
      id: 3,
      title: "New Project Proposal",
      desc: "CNC PCB Miller by Meriem has been submitted.",
      time: "1 day ago",
      type: "info",
    },
  ];

  return (
    <header className="h-20 border-b border-obsidian-800 bg-obsidian-950/40 backdrop-blur-md sticky top-0 flex items-center justify-between px-8 z-20">
      {/* Title / Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyber-cyan transition-colors" />
          <input
            type="text"
            placeholder="Search resources, students, projects..."
            className="w-full bg-obsidian-900 border border-obsidian-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all"
          />
        </div>
      </div>

      {/* Utility actions */}
      <div className="flex items-center gap-6">
        {/* Algiers Time / Local Info */}
        <div className="text-right hidden sm:block">
          <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Algiers, DZ</p>
          <p className="text-sm font-bold text-white font-mono">
            {time || "12:00 PM"}
          </p>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl border border-obsidian-800 hover:border-obsidian-700 bg-obsidian-900 hover:bg-obsidian-850 hover:text-cyber-cyan text-gray-400 relative transition-all"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neon-red rounded-full ring-2 ring-obsidian-950 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 glass-panel border border-obsidian-700 rounded-2xl shadow-2xl p-4 overflow-hidden z-50">
              <div className="flex items-center justify-between pb-3 border-b border-obsidian-800 mb-3">
                <span className="font-bold text-white text-sm">System Log Alerts</span>
                <span className="text-xs text-cyber-cyan cursor-pointer hover:underline font-mono">Mark all read</span>
              </div>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-obsidian-900/50 border border-obsidian-800 hover:border-obsidian-750 transition-all text-xs"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className={cn(
                          "font-bold",
                          n.type === "error" && "text-neon-red",
                          n.type === "warning" && "text-laser-amber",
                          n.type === "info" && "text-cyber-cyan"
                        )}
                      >
                        {n.title}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">{n.time}</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Brainpower Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyber-cyan/5 border border-cyber-cyan/20">
          <Sparkles className="w-4 h-4 text-cyber-cyan animate-pulse" />
          <span className="text-xs font-semibold text-cyber-cyan font-mono tracking-wider font-bold">SEC v1.0</span>
        </div>
      </div>
    </header>
  );
}
