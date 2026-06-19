"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Topbar } from "@/components/ui/Topbar";
import {
  LayoutDashboard,
  Cpu,
  CheckSquare,
  Award,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Daily Overview",
      icon: LayoutDashboard,
      path: "/teacher/dashboard",
      color: "hover:text-cyber-cyan hover:border-cyber-cyan/30",
      activeColor: "text-cyber-cyan border-cyber-cyan/45 bg-cyber-cyan/5",
    },
    {
      name: "My Custody Vault",
      icon: Cpu,
      path: "/teacher/my-tools",
      color: "hover:text-laser-amber hover:border-laser-amber/30",
      activeColor: "text-laser-amber border-laser-amber/45 bg-laser-amber/5",
    },
    {
      name: "Attendance register",
      icon: CheckSquare,
      path: "/teacher/attendance",
      color: "hover:text-emerald-glow hover:border-emerald-glow/30",
      activeColor: "text-emerald-glow border-emerald-glow/45 bg-emerald-glow/5",
    },
    {
      name: "Grades Entry",
      icon: Award,
      path: "/teacher/grades",
      color: "hover:text-neon-purple hover:border-neon-purple/30",
      activeColor: "text-neon-purple border-neon-purple/45 bg-neon-purple/5",
    },
    {
      name: "Write Lesson Report",
      icon: FileText,
      path: "/teacher/reports/create",
      color: "hover:text-neon-red hover:border-neon-red/30",
      activeColor: "text-neon-red border-neon-red/45 bg-neon-red/5",
    },
  ];

  return (
    <div className="flex min-h-screen bg-obsidian-950 text-foreground overflow-hidden">
      {/* Collapsible Instructor Sidebar */}
      <aside
        className={cn(
          "glass-panel border-r border-obsidian-800 flex flex-col h-screen transition-all duration-300 z-30 sticky top-0",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-20 border-b border-obsidian-800 flex items-center justify-between px-6">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center pulse-cyan">
                <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
              </div>
              <div>
                <span className="font-extrabold text-white font-sans tracking-wide">TECHFORGE</span>
                <span className="text-cyber-cyan text-xs font-mono block tracking-widest leading-none font-bold">STAFF</span>
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
              LT
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-glow border-2 border-obsidian-950 rounded-full" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Lamine Touati</p>
                <p className="text-xs text-gray-500 truncate">Senior Instructor</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        <Topbar />
        <main className="flex-1 p-8 md:p-10 space-y-8 bg-gradient-to-b from-obsidian-950 via-obsidian-950 to-obsidian-900">
          {children}
        </main>
      </div>
    </div>
  );
}
