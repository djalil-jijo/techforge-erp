"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  ScrollText,
  Wallet,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "My Dashboard", icon: LayoutDashboard, path: "/portal/dashboard", activeColor: "text-cyber-cyan border-cyber-cyan/45 bg-cyber-cyan/5", color: "hover:text-cyber-cyan hover:border-cyber-cyan/30" },
    { name: "My Schedule", icon: Calendar, path: "/portal/schedule", activeColor: "text-neon-purple border-neon-purple/45 bg-neon-purple/5", color: "hover:text-neon-purple hover:border-neon-purple/30" },
    { name: "Report Cards", icon: ScrollText, path: "/portal/report-cards", activeColor: "text-emerald-glow border-emerald-glow/45 bg-emerald-glow/5", color: "hover:text-emerald-glow hover:border-emerald-glow/30" },
    { name: "Fees & Dues", icon: Wallet, path: "/portal/fees", activeColor: "text-laser-amber border-laser-amber/45 bg-laser-amber/5", color: "hover:text-laser-amber hover:border-laser-amber/30" },
    { name: "My Activities", icon: Trophy, path: "/portal/my-activities", activeColor: "text-neon-red border-neon-red/45 bg-neon-red/5", color: "hover:text-neon-red hover:border-neon-red/30" },
  ];

  return (
    <div className="flex min-h-screen bg-obsidian-950 text-foreground overflow-hidden">
      {/* Portal Sidebar */}
      <aside className={cn(
        "glass-panel border-r border-obsidian-800 flex flex-col h-screen transition-all duration-300 z-30 sticky top-0",
        collapsed ? "w-20" : "w-64"
      )}>
        <div className="h-20 border-b border-obsidian-800 flex items-center justify-between px-6">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center pulse-cyan">
                <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
              </div>
              <div>
                <span className="font-extrabold text-white font-sans tracking-wide">TECHFORGE</span>
                <span className="text-cyber-cyan text-xs font-mono block tracking-widest leading-none font-bold">PORTAL</span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center mx-auto">
              <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg border border-obsidian-700 bg-obsidian-850 hover:bg-obsidian-800 hover:text-cyber-cyan text-gray-400 transition-colors hidden md:block cursor-pointer"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl border border-transparent text-sm font-medium text-gray-400 transition-all duration-200",
                  item.color,
                  isActive ? item.activeColor : "hover:bg-obsidian-850"
                )}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "scale-110")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-obsidian-800">
          <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "px-2")}>
            <div className="w-10 h-10 rounded-full border border-obsidian-800 bg-gradient-to-tr from-obsidian-900 to-obsidian-850 flex items-center justify-center font-bold text-white relative">
              AB
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-cyber-cyan border-2 border-obsidian-950 rounded-full pulse-cyan" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Amine Bouaziz</p>
                <p className="text-xs text-gray-500 truncate">Robotics Track · L3</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Portal Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* Minimal Portal Header */}
        <header className="h-20 border-b border-obsidian-800 bg-obsidian-950/40 backdrop-blur-md sticky top-0 flex items-center justify-between px-8 z-20">
          <div>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Student Portal</p>
            <p className="text-sm font-bold text-white">Welcome back, Amine 👋</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyber-cyan/5 border border-cyber-cyan/20">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan pulse-cyan" />
            <span className="text-xs font-bold text-cyber-cyan font-mono">Session Active</span>
          </div>
        </header>

        <main className="flex-1 p-8 md:p-10 space-y-8 bg-gradient-to-b from-obsidian-950 via-obsidian-950 to-obsidian-900">
          {children}
        </main>
      </div>
    </div>
  );
}
