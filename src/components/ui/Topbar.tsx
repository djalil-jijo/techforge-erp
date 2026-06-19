"use client";

import React from "react";
import { Bell, Settings, User, Search } from "lucide-react";

export function Topbar() {
  return (
    <div className="h-20 border-b border-obsidian-800 flex items-center justify-between px-8 md:px-10 bg-obsidian-950/50 backdrop-blur-md sticky top-0 z-20">
      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="بحث سريع..."
            className="w-full bg-obsidian-900/50 border border-obsidian-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-cyber-cyan transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-neon-red rounded-full animate-pulse" />
        </button>

        {/* Settings */}
        <button className="p-2 text-gray-400 hover:text-laser-amber transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-obsidian-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">مدير النظام</p>
            <p className="text-xs text-gray-500">النظام الرئيسي</p>
          </div>
          <button className="w-10 h-10 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center hover:border-cyber-cyan/60 transition-colors">
            <User className="w-5 h-5 text-cyber-cyan" />
          </button>
        </div>
      </div>
    </div>
  );
}
