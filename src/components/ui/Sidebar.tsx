"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Wallet,
  TrendingDown,
  Users,
  BookOpen,
  Grid2X2,
  Calendar,
  Boxes,
  FileText,
  Trophy,
  Hammer,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const adminMenuItems = [
    {
      name: "لوحة التحكم",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      color: "hover:text-cyber-cyan hover:border-cyber-cyan/30",
      activeColor: "text-cyber-cyan border-cyber-cyan/45 bg-cyber-cyan/5",
    },
    {
      name: "المدفوعات المالية",
      icon: Wallet,
      path: "/admin/payments",
      color: "hover:text-emerald-glow hover:border-emerald-glow/30",
      activeColor: "text-emerald-glow border-emerald-glow/45 bg-emerald-glow/5",
    },
    {
      name: "المصاريف",
      icon: TrendingDown,
      path: "/admin/expenses",
      color: "hover:text-laser-amber hover:border-laser-amber/30",
      activeColor: "text-laser-amber border-laser-amber/45 bg-laser-amber/5",
    },
    {
      name: "الطلاب",
      icon: Users,
      path: "/admin/students",
      color: "hover:text-neon-purple hover:border-neon-purple/30",
      activeColor: "text-neon-purple border-neon-purple/45 bg-neon-purple/5",
    },
    {
      name: "الأساتذة",
      icon: BookOpen,
      path: "/admin/teachers",
      color: "hover:text-cyber-cyan hover:border-cyber-cyan/30",
      activeColor: "text-cyber-cyan border-cyber-cyan/45 bg-cyber-cyan/5",
    },
    {
      name: "الفوج والقاعات",
      icon: Grid2X2,
      path: "/admin/classes",
      color: "hover:text-laser-amber hover:border-laser-amber/30",
      activeColor: "text-laser-amber border-laser-amber/45 bg-laser-amber/5",
    },
    {
      name: "الجدول الزمني",
      icon: Calendar,
      path: "/admin/timetable",
      color: "hover:text-emerald-glow hover:border-emerald-glow/30",
      activeColor: "text-emerald-glow border-emerald-glow/45 bg-emerald-glow/5",
    },
    {
      name: "المستودع",
      icon: Boxes,
      path: "/admin/inventory",
      color: "hover:text-neon-purple hover:border-neon-purple/30",
      activeColor: "text-neon-purple border-neon-purple/45 bg-neon-purple/5",
    },
    {
      name: "التقارير",
      icon: FileText,
      path: "/admin/reports",
      color: "hover:text-neon-red hover:border-neon-red/30",
      activeColor: "text-neon-red border-neon-red/45 bg-neon-red/5",
    },
    {
      name: "المسابقات",
      icon: Trophy,
      path: "/admin/competitions",
      color: "hover:text-laser-amber hover:border-laser-amber/30",
      activeColor: "text-laser-amber border-laser-amber/45 bg-laser-amber/5",
    },
    {
      name: "مشاريع FabLab",
      icon: Hammer,
      path: "/admin/projects",
      color: "hover:text-cyber-cyan hover:border-cyber-cyan/30",
      activeColor: "text-cyber-cyan border-cyber-cyan/45 bg-cyber-cyan/5",
    },
    {
      name: "إدارة المتجر",
      icon: ShoppingBag,
      path: "/admin/shop",
      color: "hover:text-pink-400 hover:border-pink-400/30",
      activeColor: "text-pink-400 border-pink-400/45 bg-pink-400/5",
    },
    {
      name: "طلبات المتجر",
      icon: ShoppingCart,
      path: "/admin/shop/orders",
      color: "hover:text-neon-purple hover:border-neon-purple/30",
      activeColor: "text-neon-purple border-neon-purple/45 bg-neon-purple/5",
    },
  ];

  return (
    <aside
      className={cn(
        "glass-panel border-l border-obsidian-800 flex flex-col h-screen transition-all duration-300 z-30 sticky top-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="h-20 border-b border-obsidian-800 flex items-center justify-between px-6">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/33 flex items-center justify-center pulse-cyan">
              <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-white font-sans tracking-wide text-sm">تك فورج</span>
              <span className="text-cyber-cyan text-xs font-mono block tracking-widest leading-none font-bold">
                لوحة الإدارة
              </span>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/33 flex items-center justify-center mx-auto pulse-cyan">
            <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto space-y-2 p-4">
        {adminMenuItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300",
                isActive
                  ? item.activeColor
                  : `text-gray-400 border-transparent ${item.color}`
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium text-sm">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-obsidian-800 p-4">
        <button
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg border",
            "text-neon-red border-neon-red/30 hover:bg-neon-red/5 transition-all"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium text-sm">تسجيل الخروج</span>}
        </button>

        {/* Toggle Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full mt-2 flex items-center justify-center py-2 text-gray-500 hover:text-cyber-cyan transition-colors"
        >
          {collapsed ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>
    </aside>
  );
}
